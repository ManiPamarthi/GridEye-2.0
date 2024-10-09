### Major Performance variables of Suricata

- Traffic type
- Rules used
- System capability and configurations (RAM, CPU, NUMA, L3 Cache, OS/Kernel version)
- Suricata version and tuning 

Considering no hypervisor and bare metal installation of suricata in the EDGE system

### **Life of a Packet at Grideye Edge: Rx @ NIC -> kernel -> Suricata ( capture - decode - stream - detect - output ) -> kernel -> Tx @ NIC**
-  System level generic tuning pointers
- [ ] Remove IRQBalance
- [ ] Remove any unintended NIC offloading
- [ ] Remove IOMMU/unnecessary BIOS settings like Vt-d/Vt-x etc.
- [ ] Isolate CPUs
- [ ] Set IRQ affinity
- [ ]Assign CPUs to packet processing worker threads keeping NUMA affinity in mind
- Suricata yaml tuning
- [ ] AF_PACKET + tpacket_v3 + mmap

Note: PF_RING opensource version (NIC/FPGA support might be required as well) can be evaluated and compared with AF_PACKET as well.
  
```
# Number of receive threads. "auto" uses the number of cores
    #threads: auto
    # Default clusterid. AF_PACKET will load balance packets based on flow.
    cluster-id: 99
    # Default AF_PACKET cluster type. AF_PACKET can load balance per flow or per hash.
    # This is only supported for Linux kernel > 3.1
    # possible value are:
    #  * cluster_flow: all packets of a given flow are sent to the same socket
    #  * cluster_cpu: all packets treated in kernel by a CPU are sent to the same socket
    #  * cluster_qm: all packets linked by network card to a RSS queue are sent to the same
    #  socket. Requires at least Linux 3.14.
    #  * cluster_ebpf: eBPF file load balancing. See doc/userguide/capture-hardware/ebpf-xdp.rst for
    #  more info.
    # Recommended modes are cluster_flow on most boxes and cluster_cpu or cluster_qm on system
    # with capture card using RSS (requires cpu affinity tuning and system IRQ tuning)
    cluster-type: cluster_flow
    # In some fragmentation cases, the hash can not be computed. If "defrag" is set
    # to yes, the kernel will do the needed defragmentation before sending the packets.
    defrag: yes
    # To use the ring feature of AF_PACKET, set 'use-mmap' to yes
    #use-mmap: yes
    # Lock memory map to avoid it being swapped. Be careful that over
    # subscribing could lock your system
    #mmap-locked: yes
    # Use tpacket_v3 capture mode, only active if use-mmap is true
    # Don't use it in IPS or TAP mode as it causes severe latency
    #tpacket-v3: yes
    # Ring size will be computed with respect to "max-pending-packets" and number
    # of threads. You can set manually the ring size in number of packets by setting
    # the following value. If you are using flow "cluster-type" and have really network
    # intensive single-flow you may want to set the "ring-size" independently of the number
    # of threads:
    #ring-size: 2048
    # Block size is used by tpacket_v3 only. It should set to a value high enough to contain
    # a decent number of packets. Size is in bytes so please consider your MTU. It should be
    # a power of 2 and it must be multiple of page size (usually 4096).
    #block-size: 32768
    # tpacket_v3 block timeout: an open block is passed to userspace if it is not
    # filled after block-timeout milliseconds.
    #block-timeout: 10
    # On busy systems, set it to yes to help recover from a packet drop
    # phase. This will result in some packets (at max a ring flush) not being inspected.
    #use-emergency-flush: yes
    # recv buffer size, increased value could improve performance
    # buffer-size: 32768
    # Set to yes to disable promiscuous mode
    # disable-promisc: no
    # Choose checksum verification mode for the interface. At the moment
    # of the capture, some packets may have an invalid checksum due to
    # the checksum computation being offloaded to the network card.
    # Possible values are:
    #  - kernel: use indication sent by kernel for each packet (default)
    #  - yes: checksum validation is forced
    #  - no: checksum validation is disabled
    #  - auto: Suricata uses a statistical approach to detect when
    #  checksum off-loading is used.
    # Warning: 'capture.checksum-validation' must be set to yes to have any validation
    #checksum-checks: kernel
    # BPF filter to apply to this interface. The pcap filter syntax applies here.
    #bpf-filter: port 80 or udp
    # You can use the following variables to activate AF_PACKET tap or IPS mode.
    # If copy-mode is set to ips or tap, the traffic coming to the current
    # interface will be copied to the copy-iface interface. If 'tap' is set, the
    # copy is complete. If 'ips' is set, the packet matching a 'drop' action
    # will not be copied.
    #copy-mode: ips
    #copy-iface: eth1
    #  For eBPF and XDP setup including bypass, filter and load balancing, please
    #  see doc/userguide/capture-hardware/ebpf-xdp.rst for more info.

  # Put default values here. These will be used for an interface that is not
  # in the list above.
  - interface: default
    #threads: auto
    #use-mmap: no
    #tpacket-v3: yes

interface: enp0s1
   threads: 15
   cluster-id: 99
   use-mmap: yes
   tpacket-v3: yes
   ring-size: 400000
   block-size: 393216
   buffer-size: 1048576
   cluster-type: cluster_flow
```

Config values for example for af-packet could be quickly displayed with on the command line as well with 
`suricata --dump-config |grep af-packet`


- Consider thread level tuning

```
# Suricata is multi-threaded. Here the threading can be influenced.
threading:
  set-cpu-affinity: no
  # Tune cpu affinity of threads. Each family of threads can be bound
  # to specific CPUs.
  #
  # These 2 apply to the all runmodes:
  # management-cpu-set is used for flow timeout handling, counters
  # worker-cpu-set is used for 'worker' threads
  #
  # Additionally, for autofp these apply:
  # receive-cpu-set is used for capture threads
  # verdict-cpu-set is used for IPS verdict threads
  #
  cpu-affinity:
    - management-cpu-set:
        cpu: [ 0 ]  # include only these CPUs in affinity settings
    - receive-cpu-set:
        cpu: [ 0 ]  # include only these CPUs in affinity settings
    - worker-cpu-set:
        cpu: [ "all" ]
        mode: "exclusive"
        # Use explicitly 3 threads and don't compute number by using
        # detect-thread-ratio variable:
        # threads: 3
        prio:
          low: [ 0 ]
          medium: [ "1-2" ]
          high: [ 3 ]
          default: "medium"
    #- verdict-cpu-set:
    #    cpu: [ 0 ]
    #    prio:
    #      default: "high"
  #
  # By default Suricata creates one "detect" thread per available CPU/CPU core.
  # This setting allows controlling this behaviour. A ratio setting of 2 will
  # create 2 detect threads for each CPU/CPU core. So for a dual core CPU this
  # will result in 4 detect threads. If values below 1 are used, less threads
  # are created. So on a dual core CPU a setting of 0.5 results in 1 detect
  # thread being created. Regardless of the setting at a minimum 1 detect
  # thread will always be created.
  #
  detect-thread-ratio: 1.0
  #
  # By default, the per-thread stack size is left to its default setting. If
  # the default thread stack size is too small, use the following configuration
  # setting to change the size. Note that if any thread's stack size cannot be
  # set to this value, a fatal error occurs.
  #
  # Generally, the per-thread stack-size should not exceed 8MB.
  #stack-size: 8mb
```


- enable local bypass feature - If the corresponding flow is local bypassed then it simply skips all streaming, detection and output and the packet goes directly out in IDS mode and to verdict in IPS mode.

```
# Stream engine settings. Here the TCP stream tracking and reassembly
# engine is configured.
#
# stream:
#   memcap: 64mb                # Can be specified in kb, mb, gb.  Just a
#                               # number indicates it's in bytes.
#   memcap-policy: ignore       # Can be "drop-flow", "pass-flow", "bypass",
#                               # "drop-packet", "pass-packet", "reject" or
#                               # "ignore" default is "ignore"
#   checksum-validation: yes    # To validate the checksum of received
#                               # packet. If csum validation is specified as
#                               # "yes", then packets with invalid csum values will not
#                               # be processed by the engine stream/app layer.
#                               # Warning: locally generated traffic can be
#                               # generated without checksum due to hardware offload
#                               # of checksum. You can control the handling of checksum
#                               # on a per-interface basis via the 'checksum-checks'
#                               # option
#   prealloc-sessions: 2k       # 2k sessions prealloc'd per stream thread
#   midstream: false            # don't allow midstream session pickups
#   midstream-policy: ignore    # Can be "drop-flow", "pass-flow", "bypass",
#                               # "drop-packet", "pass-packet", "reject" or
#                               # "ignore" default is "ignore"
#   async-oneside: false        # don't enable async stream handling
#   inline: no                  # stream inline mode
#   drop-invalid: yes           # in inline mode, drop packets that are invalid with regards to streaming engine
#   max-synack-queued: 5        # Max different SYN/ACKs to queue
#   bypass: no                  # Bypass packets when stream.reassembly.depth is reached.
#                               # Warning: first side to reach this triggers
#                               # the bypass.
#
#   reassembly:
#     memcap: 256mb             # Can be specified in kb, mb, gb.  Just a number
#                               # indicates it's in bytes.
#     memcap-policy: ignore     # Can be "drop-flow", "pass-flow", "bypass",
#                               # "drop-packet", "pass-packet", "reject" or
#                               # "ignore" default is "ignore"
#     depth: 1mb                # Can be specified in kb, mb, gb.  Just a number
#                               # indicates it's in bytes.
#     toserver-chunk-size: 2560 # inspect raw stream in chunks of at least
#                               # this size.  Can be specified in kb, mb,
#                               # gb.  Just a number indicates it's in bytes.
#     toclient-chunk-size: 2560 # inspect raw stream in chunks of at least
#                               # this size.  Can be specified in kb, mb,
#                               # gb.  Just a number indicates it's in bytes.
#     randomize-chunk-size: yes # Take a random value for chunk size around the specified value.
#                               # This lowers the risk of some evasion techniques but could lead
#                               # to detection change between runs. It is set to 'yes' by default.
#     randomize-chunk-range: 10 # If randomize-chunk-size is active, the value of chunk-size is
#                               # a random value between (1 - randomize-chunk-range/100)*toserver-chunk-size
#                               # and (1 + randomize-chunk-range/100)*toserver-chunk-size and the same
#                               # calculation for toclient-chunk-size.
#                               # Default value of randomize-chunk-range is 10.
#
#     raw: yes                  # 'Raw' reassembly enabled or disabled.
#                               # raw is for content inspection by detection
#                               # engine.
#
#     segment-prealloc: 2048    # number of segments preallocated per thread
#
#     check-overlap-different-data: true|false
#                               # check if a segment contains different data
#                               # than what we've already seen for that
#                               # position in the stream.
#                               # This is enabled automatically if inline mode
#                               # is used or when stream-event:reassembly_overlap_different_data;
#                               # is used in a rule.
#
stream:
  memcap: 64mb
  #memcap-policy: ignore
  checksum-validation: yes      # reject incorrect csums
  #midstream: false
  #midstream-policy: ignore
  inline: auto                  # auto will use inline mode in IPS mode, yes or no set it statically
  reassembly:
    memcap: 256mb
    #memcap-policy: ignore
    depth: 1mb                  # reassemble 1mb into a stream
    toserver-chunk-size: 2560
    toclient-chunk-size: 2560
    randomize-chunk-size: yes
    #randomize-chunk-range: 10
    #raw: yes
    #segment-prealloc: 2048
    #check-overlap-different-data: true
```

- Flow timeout should be configured to clean the flows and make space for others to be processed
```
# Specific timeouts for flows. Here you can specify the timeouts that the
# active flows will wait to transit from the current state to another, on each
# protocol. The value of "new" determines the seconds to wait after a handshake or
# stream startup before the engine frees the data of that flow it doesn't
# change the state to established (usually if we don't receive more packets
# of that flow). The value of "established" is the amount of
# seconds that the engine will wait to free the flow if that time elapses
# without receiving new packets or closing the connection. "closed" is the
# amount of time to wait after a flow is closed (usually zero). "bypassed"
# timeout controls locally bypassed flows. For these flows we don't do any other
# tracking. If no packets have been seen after this timeout, the flow is discarded.
#
# There's an emergency mode that will become active under attack circumstances,
# making the engine to check flow status faster. This configuration variables
# use the prefix "emergency-" and work similar as the normal ones.
# Some timeouts doesn't apply to all the protocols, like "closed", for udp and
# icmp.

flow-timeouts:

  default:
    new: 30
    established: 300
    closed: 0
    bypassed: 100
    emergency-new: 10
    emergency-established: 100
    emergency-closed: 0
    emergency-bypassed: 50
  tcp:
    new: 60
    established: 600
    closed: 60
    bypassed: 100
    emergency-new: 5
    emergency-established: 100
    emergency-closed: 10
    emergency-bypassed: 50
  udp:
    new: 30
    established: 300
    bypassed: 100
    emergency-new: 10
    emergency-established: 100
    emergency-bypassed: 50
  icmp:
    new: 30
    established: 300
    bypassed: 100
    emergency-new: 10
    emergency-established: 100
    emergency-bypassed: 50
```
- Flow capacity size limit, maximum pre allocated flow number, emergency pruning strategies
```
# Flow settings:
# By default, the reserved memory (memcap) for flows is 32MB. This is the limit
# for flow allocation inside the engine. You can change this value to allow
# more memory usage for flows.
# The hash-size determines the size of the hash used to identify flows inside
# the engine, and by default the value is 65536.
# At startup, the engine can preallocate a number of flows, to get better
# performance. The number of flows preallocated is 10000 by default.
# emergency-recovery is the percentage of flows that the engine needs to
# prune before clearing the emergency state. The emergency state is activated
# when the memcap limit is reached, allowing new flows to be created, but
# pruning them with the emergency timeouts (they are defined below).
# If the memcap is reached, the engine will try to prune flows
# with the default timeouts. If it doesn't find a flow to prune, it will set
# the emergency bit and it will try again with more aggressive timeouts.
# If that doesn't work, then it will try to kill the oldest flows using
# last time seen flows.
# The memcap can be specified in kb, mb, gb.  Just a number indicates it's
# in bytes.
# The memcap-policy can be "drop-flow", "pass-flow", "bypass", "drop-packet",
# "pass-packet", "reject" or "ignore" (which is the default).

flow:
  memcap: 128mb
  #memcap-policy: ignore
  hash-size: 65536
  prealloc: 10000
  emergency-recovery: 30
  #managers: 1 # default to one flow manager
  #recyclers: 1 # default to one flow recycler thread
```
- Defragmentation settings
```
# Defrag settings:

# The memcap-policy value can be "drop-flow", "pass-flow", "bypass",
# "drop-packet", "pass-packet", "reject" or "ignore" (which is the default).
defrag:
  memcap: 32mb
  # memcap-policy: ignore
  hash-size: 65536
  trackers: 65535 # number of defragmented flows to follow
  max-frags: 65535 # number of fragments to keep (higher than trackers)
  prealloc: yes
  timeout: 60
```
- Note for MODBUS protocol
```
# According to MODBUS Messaging on TCP/IP Implementation Guide V1.0b, it
      # is recommended to keep the TCP connection opened with a remote device
      # and not to open and close it for each MODBUS/TCP transaction. In that
      # case, it is important to set the depth of the stream reassembling as
      # unlimited (stream.reassembly.depth: 0)

      # Stream reassembly size for modbus. By default track it completely.
      stream-depth: 0
```
- RULE grouping

The detection-engine builds internal groups of signatures. Suricata loads signatures, with which the network traffic will be compared. The fact is, that many rules certainly will not be necessary. (For instance: if there appears a packet with the UDP-protocol, all signatures for the TCP-protocol won’t be needed.) For that reason, all signatures will be divided in groups. However, a distribution containing many groups will make use of a lot of memory. Not every type of signature gets its own group. There is a possibility that different signatures with several properties in common, will be placed together in a group. The quantity of groups will determine the balance between memory and performance. A small amount of groups will lower the performance yet uses little memory. The opposite counts for a higher amount of groups. The engine allows you to manage the balance between memory and performance. To manage this, (by determining the amount of groups) there are several general options: high for good performance and more use of memory, low for low performance and little use of memory. The option medium is the balance between performance and memory usage. This is the default setting. The option custom is for advanced users. This option has values which can be managed by the user.
```
detect:
  profile: medium
  custom-values:
    toclient-groups: 2
    toserver-groups: 25
  sgh-mpm-context: auto
  inspection-recursion-limit: 3000
```
- Prefilter Engines
The concept of prefiltering is that there are far too many rules to inspect individually. The approach prefilter takes is that from each rule one condition is added to prefilter, which is then checked in one step. The most common example is MPM (also known as fast_pattern). This takes a single pattern per rule and adds it to the MPM. Only for those rules that have at least one pattern match in the MPM stage, individual inspection is performed.

Next to MPM, other types of keywords support prefiltering. ICMP itype, icode, icmp_seq and icmp_id for example. TCP window, IP TTL are other examples.

For a full list of keywords that support prefilter, see:

`suricata --list-keywords=all`

Suricata can automatically select prefilter options, or it can be set manually.
```
detect:
  prefilter:
    default: mpm
```
By default, only MPM/fast_pattern is used.

The prefilter engines for other non-MPM keywords can then be enabled in specific rules by using the ‘prefilter’ keyword.

E.g.

`alert ip any any -> any any (ttl:123; prefilter; sid:1;)`
To let Suricata make these decisions set default to ‘auto’:
```
detect:
  prefilter:
    default: auto
```
- Pattern/regex matching algorithm used in rule matching


The multi-pattern-matcher (MPM) is a part of the detection engine within Suricata that searches for multiple patterns at once. Often, signatures have one ore more patterns. Of each signature, one pattern is used by the multi-pattern-matcher. That way Suricata can exclude many signatures from being examined, because a signature can only match when all its patterns match.

These are the proceedings:

A packet comes in.
The packed will be analyzed by the Multi-pattern-matcher in search of patterns that match.
All patterns that match, will be further processed by Suricata (signatures).

Aho-corasick

`mpm-algo: ac`


Hyperscan

`mpm-algo: hs`

On x86_64 hs (Hyperscan) should be used for best performance.


- Maximum Pending Packets

With the max-pending-packets setting you can set the number of packets you allow Suricata to process simultaneously. This can range from one packet to tens of thousands/hundreds of thousands of packets. It is a trade of higher performance and the use of more memory (RAM), or lower performance and less use of memory. A high number of packets being processed results in a higher performance and the use of more memory. A low number of packets, results in lower performance and less use of memory. Choosing a low number of packets being processed while having many CPU’s/CPU cores, can result in not making use of the whole computer-capacity. (For instance: using one core while having three waiting for processing packets.)

`max-pending-packets: 1024`

- Memory allocation techniques (If required)

malloc vs jemalloc vs tcmalloc

- Rule profiling / Packet profiling (if needed)

Packet/rule profiling is convenient in case you would like to know how long packets take to be processed. It is a way to figure out why certain packets/rules are being processed quicker than others.



`./configure --enable-profiling`

`suricata -c /etc/suricata/suricata.yaml -r log.pcap.1304589204
`


