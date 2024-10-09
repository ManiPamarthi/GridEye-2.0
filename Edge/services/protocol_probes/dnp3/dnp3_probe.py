import broker
import signal
import os
import sys
import threading
import time
import json

from lib.probe import Probe


devicePairTable = {}
deviceTable = {}


def isDeviceKnown(deviceIP, devicePort, deviceId):
    '''
    Checks whether a given device information is already present in the table ot not. Return True if found else returns False
    '''
    key = None
    if deviceId != None  :
        key = deviceIP+devicePort+deviceId
    else :
        key = deviceIP+devicePort

    if key in deviceTable.keys() :
        return True
    else :
        return False



def addDeviceToTable(deviceIP, devicePort, deviceId):
    '''
    Adds a dvice entry to the table
    '''
    key = None
    if deviceId != None  :
        key = deviceIP+devicePort+deviceId
    else :
        key = deviceIP+devicePort
    deviceTable[key] = (deivceIP, devicePort, deviceId)

    return True


def addDevicePair(sourceIP, sourcePort,sourceId,  destinationIP, destinatipPort, destinationId):
    '''
    This function is used to maintain device pair information. In this case, forward and reverse keys are maintained
    '''
    key1 = sourceIP+sourcePort+destinationIP+destinationPort
    key2 = destinationIP+destinationPort+sourceIP+sourcePort

    if key1 in deviePairTable.keys() or key2 in devicePairTable.keys() :
        return False
    else :
        devicePairTable[key1] = key2
        devicePairTable[key2] = key1

        return True

class DNP3Probe(Probe):
    '''
    This calss extends the base Probe class and provide the required logic for processing DNP3 PDU/event infomration
    '''
    def __init__(self, name, listenIP, listenPort, topic, shutdownEvent):
        super().__init__(name, topic, listenIP, listenPort, shutdownEvent)
        self.listenIP = listenIP
        self.listenPort = listenPort
        self.topic = topic
        self.ep = None
        self.sub = None
        self.ss = None
        super().setOnMessageCallback(self.dnp3OnMessageCallback)


    def loadRules(self, ruleFileName): # return number of rules loaded
        '''
        THis functions loads the rules from the rule file specified in the settings
        '''
        fp = None
        try :
            fp = open(ruleFileNmae, "r")
            ruleInfo = json.loads(fp.read())

            self.rules = ruleInfo["Rules"]
            return (len(self.rules), "Successfully loaded the rules")

        except :
            self.rules = None
        finally :
            if fp != None :
                fp.close()

            return (-1, "Error while loading the rules from "+ruleFileName);

    def dnp3OnMessageCallback(self, event_data):
        '''
        This is a callback function that would invoked when a new message arrives
        '''
        print(super().getProbeName(), "On Event", event_data)
        self.processMessage(event_data)


    def checkForDevice(self, event_data):
        '''
        This function checks as to whether a device is present in the table, if not adds to the table
        '''
        timeStamp = event_data["ts"]
        originIP = event_data["id.orig_h"]
        originPort = event_data["id.orig_p"]
        destIP = event_data["id.resp_h"]
        destPort = event_data["id.resp_p"]

        if isKnownDevice(originIP, originPort, None) == False :
            addDeviceToTable(originIP, originPort, None)

        if isKnownDevice(destIP, destPort, None) == False :
            addDeviceToTable(destIP, destPort, None)


        return addDevicePair(originIP, originPort, None, destIP, destPort, None)

    def getDevicePair(self, event_data):
        '''
        Using the source and destination information, it return a device pair information
        '''
        timeStamp = event_data["ts"]
        originIP = event_data["id.orig_h"]
        originPort = event_data["id.orig_p"]
        destIP = event_data["id.resp_h"]
        destPort = event_data["id.resp_p"]

        key = originIP+originPort+destIP+destPort
        if key in devicePairTable.keys() :
            return (key, devicePairTable[key])


    def processRules(self, event_data) :
        '''
        THis function would run through all the rules defined for a given DNP3 event and report 
        if any anamolies found
        '''
        pass





    def processMessage(self, event_data):
        '''
        This function does the initial checks and then switches the control to rule processing
        '''
        timeStamp = event_data["ts"]
        originIP = event_data["id.orig_h"]
        originPort = event_data["id.orig_p"]
        destIP = event_data["id.resp_h"]
        destIP = event_data["id.resp_p"]

        # check as to whether it is a anamoly log
        if "notice" in event_data.keys() :
            eventName = event_data["name"]
            noticeType = event_data["notice"]
            protocolSource = event_data["source"]

        elif "conn_state" in event_data.keys() :
            # it is a connection log
            protocolSource = event_data["service"]

        else :

            functionCode = event_data["function_code"]
            blockType = None
            if "block_type" in event_data.keys() :
                blockType = event_data["block_type"]

            if blockType != None :
                linkLength = event_data["link_length"]
                linkControlCode = event_data["link_control_code"]
                linkSrcAddr = event_data["link_src_addr"]
                linkDetAddr = event_data["link_dest_addr"]

        if checkForDevice(event_data) == False  :  # device pair already known
            print("Old Device Pair")
        else :
            print("New Device pair found", getDevicePair(event_data))


        if self.rules != None :
            self.processRules(event_data)
