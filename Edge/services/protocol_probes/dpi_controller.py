import broker
import signal
import os
import sys
import threading
import time
import json

sys.path.insert(1, "/home/giri/GRIDEYE%202.0/Edge/services/protocol_probes/lib")
sys.path.insert(2, "/home/giri/GRIDEYE%202.0/Edge/services/protocol_probes/dnp3")
sys.path.insert(3, "/home/giri/GRIDEYE%202.0/Edge/services/protocol_probes/modbus")

from lib.probe import Probe
from dnp3_probe import DNP3Probe
from modbus_probe import MODBUSProbe

ip_table = {}
start_time = time.time()
shutdownEvent = threading.Event()
configProps = None
probeTable = {}
    
def get_class(class_name):
    ''' This function returns a class object for a class name specified as an argument as long as that class is loaded
    as a module
    '''
    return getattr(sys.modules[__name__], class_name)



def loadSettings(filename) :
    '''
    This function read the settings file and converts the contents into JSON form
    '''
    global configProps
    fp = None
    try :
        print("Config file = ", filename)    
        fp = open(os.path.join(sys.path[0], filename), "r") 
   
        data = fp.read()
        configProps = json.loads(data)
        return True
    except Exception as ex:
        print("Failed to locate or read the settings file", ex)
        return False
    finally :
        if fp != None : 
            fp.close()

def signal_handler(sig, event):
    '''
    This is a signal handler function used to trap the Ctrl+C key press so that
    all the running threads can be stopped and application can be shutdown
    gracefully
    '''
    global shutdownEvent
    print("Ctrl_C has been pressed...Waiting for clean-up..")
    shutdownEvent.set()
    time.sleep(5)
    print("Shutting down the service..")
    sys.exit(0)



def loadProbes():
    '''
    Based on the probe definitiosn provided in the settings file, this function create
    instane of each probe class that is enabled and start a separate listner as thread.
    By doing so, it will create a parallel env of probes waiting for respective message
    under the registered topics
    '''
    global configProps
    numProbes = 0
    probesToLoad = configProps["Probes"]
    for p in probesToLoad :
        aProbeInfo = p
        if aProbeInfo["Status"] == "Enabled" : 
            probeInstance = get_class(aProbeInfo["Class"])(aProbeInfo["Name"], aProbeInfo["ListenAddress"], 
                    aProbeInfo["ListenPort"],aProbeInfo["Topic"], shutdownEvent)
            probeTable[aProbeInfo["Topic"]] = probeInstance
            probeInstance.loadRules(aProbeInfo["RulesFile"])
            probeInstance.startProbe()
            numProbes += 1
    print("Total Number of probes loaded = ", numProbes)

    return numProbes


def main():
    '''
    This is the main function that loads the settings and then loads all the probes and wait for events
    '''
    global configProps

    if loadSettings(sys.argv[1]) != True :
        sys.exit(-1)
            
    print("Settings file loaded successfully!\n")

    signal.signal(signal.SIGINT, signal_handler)


    loadProbes()

    while True :
        if shutdownEvent.is_set() :
            break

        time.sleep(1)

if __name__ == '__main__':
    main()
