**Challenges in the creating setup**

1. How suricata performance can be tested?
 - We will be deploying suricata in IDS mode. But, it is very difficult to test suricata performance in the mode as of now, the reason is that we are testing suricata with PCAPs now using which it is not always possible to generate accurate bandwidth. One option is to use tcpreplay
**sudo tcpreplay -i enp0s8 -Kt -l 20 --mbps 1000 bigFlows.pcap**
but measuring tcpreplay's pumping speed is not straight forward.
Other option could be use of switch and span port.

- Now if we configure suricata in IPS mode
   - we will be able to test the forwarding speed of suricata in the presence of rules and different system config
   - simulate master slave communication model and test suricata, sitting in between
   - using tcpreplay is also possible

2. How are we going make this setup work?
- Setting up IPS in Azure is not possible yet.
- IPS mode will need two promisc mode interface connecting to a switch/bridge with the other end systems (slave and master)
 - It looks like
   slave ---- switch --- suricata IPS ---- switch ----- master
   - configuring this in azure not possible, therefore we will use IDS mode only but first for understanding and capturing basic performance figures we will do it using a local setup

3. How to setup locally?
- install oracle VM ware
- install ubuntu/redhat server image
- install 3 VMs (slave, suricata, master) with 2 cpu and 2/4 gb ram each
- suricata VM will need 3 interfaces, one management, one slave side and another master side
- Interfaces are denoted as adapters here
- All management interfaces will be bridged adapters and will get IP addresses
- use internal network to connect VMs and give same name in both side, for eg. if slave VM adapter using internal network "slave", the left side interface suricata will have to put same internal network name "slave"
- use local ip in the slave VM interface and master VM interface, but ip address in suricata VM interfaces not required
- suricata VM interfaces must be in promisc mode, which can be configured in the adapter setting itself.
- All the above steps will connect/stich these VMs

4. How to use iperf3?
 - iperf3 has a client server model
 - Master side: **iperf3 -s -B <ip of the master VM interface connected to suricata VM>**
 - Slave side: **sudo iperf3 -c <ip of the slave VM interface connected to suricata VM> -B <ip of the master VM interface where you want to send the traffic> -i1 -t 100 -P 10**



**Suricata yaml configuration tunings**

current Suricata system configurations
CPUs: 2
RAM: 4GB


Suricata is running in IPS mode and slave sending packet to master using iperf3


1. Disable all logging, disable all rules , 
 a. Send traffic uni-directional 
- check performance
- check cpu usage
- check drop counter
 b. Send traffic bi-directional 
- check performance
- check cpu usage
- check drop counter



1. Disable all logging, disable all rules: 
 a. Send traffic uni-directional 
- check performance - 170Mbps nax/ 100 Mbps avg
- check cpu usage
- check drop counter
 b. Send traffic bi-directional 
- check performance - 50Mbps Avg
- check cpu usage
- check drop counter


2. Enable all logging, disable all rules:
 a. Send traffic uni-directional 
- check performance
- check cpu usage
- check drop counter
 b. Send traffic bi-directional 
- check performance
- check cpu usage
- check drop counter

3. Disable all logging, enabled all required rules:
 a. Send traffic uni-directional 
- check performance
- check cpu usage
- check drop counter
 b. Send traffic bi-directional 
- check performance
- check cpu usage
- check drop counter


4. Enable all logging, enabled all required rules:
 a. Send traffic uni-directional 
- check performance
- check cpu usage
- check drop counter
 b. Send traffic bi-directional 
- check performance
- check cpu usage
- check drop counter

5. Use CPU-affinity tuning and increase CPU of the VM accordingly
 - Pin worker thread
 - pin management thread
 - pin capture thread

6. Increase buffer sizes
 - increase ring size
 - increase prealloc session
 - increase stream buffers
 - increase defrag depth
 - increase max pending packets

7. Change to PF_RING




**Results**
1. With the tuned yaml we can achieve throughput of 200-300Mbps without any drop (that's the max throughput genrated with the current confiuration and 1 CPU used for processing, we can assume this will linearly increase, i.e. if we give 4 CPUs the we can achieve 1Gbps+ of throughput. Here number of flows were ~150
2. With the current configuration, we can achieve max 3000 frame per second speed and 10K tcp session with out any drop, throughput observed ~80Mbps. No drop observed. Increasing the sessions or throuput causes packet drop.
3. With 40000 rules enabled, throughput dropped to 65 - 140 Mbps.
4. Full Logs were enabled in all of the above cases.
5. All of these are used with capture mode af-packet and runmode workers

6. Tested autofp runmode, with capture threads 8 and 16, there is no performance enhancement observed.




** Limitations and few more optimisation scopes: **
1. No of cores and processor model
2. Interface type linked between two VMs
3. Specific rules , OT protocols
4. Specific log enabling
5. Huge page setting for cache miss minimisation
6. Protocol specific traffic pcap or traffic generator
7. CPU affinity





** Rule related performance testing **
1. Tested MODBUS rules with the modbus.pcap
2. MODBUS rules are hitting with the pcap and it has few rules with regex and payload matching 
3. Here comes the role of regex algortihms. So, ac-ks algo works better then ac ( default algo , aho-corasic)
in terms of processing speed.
4. Advance steps will be to install hyperscan, link it suricata and test the performance. However, hyperscan will
be specific to intel based x86_64 processors


5. Tested with Hyperscan, any significant performance boost was not observed. It may be useful for more complex regex matches
biswa@biswa:~/suricata-6.0.9$ /usr/bin/suricata --build-info | grep Hyp
  Hyperscan support:                       yes

** Hyperscan installation Guide **

apt-get install libboost-dev
git clone https://github.com/intel/hyperscan
cd hyperscan
mkdir build
cd build
cmake  -DFAT_RUNTIME=off -DBUILD_STATIC_AND_SHARED=1 ../
make
sudo make install

Recompile suricata with hyperscan:-

sudo ./configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var --with-libhs-includes=/usr/local/include/hs/ --with-libhs-libraries=/usr/local/lib/

sudo make
sudo make install-full
sudo make install
