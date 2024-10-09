import broker
import signal
import os
import sys
import threading
import time
import json

class Probe(object):
    '''
    This is the base class that provide key functions fo any probe. Any protocol specific probe can extend this base class for doing
    deep packet inspection.
    '''

    def __init__(self,name, topic, listenIP, listenPort, shutdownEvent):
        '''
        In the initi function, an end point is created to listen for message published from zeek for a given topic of interest
        Under zeek framework, for each topic, we need to listen on unique pair of IP and POrt number
        '''
        self.probeName = name
        self.listenIP = listenIP
        self.listenPort = listenPort
        self.topic = topic
        self.onMessageCallback = None
        self.shutdownEvent  = shutdownEvent

    def setOnMessageCallback(self, callbackFunction):
        '''
        This function initializes the callback function that would get called whn a new message arrives for a topic
        '''
        self.onMessageCallback = callbackFunction


    def getProbeName(self):
        '''
        This function return the "ProbeName" which is set in the configuration file
        '''
        return self.probeName

    def initProbe(self):
        self.ep = broker.Endpoint()
        '''
        Initialize the end point and start listening on specified IP and Port
        '''
        self.sub = self.ep.make_subscriber(self.topic)
        self.ss = self.ep.make_status_subscriber(True)
        self.ep.listen(self.listenIP, self.listenPort)


    def loadRules(self, filename):
        pass

    def startProbe(self):
        '''
        This function start the listener function as a thread function
        '''
        t = threading.Thread(target=self.process, args=(self.probeName,self.onMessageCallback,self.shutdownEvent, ))
        t.start()

    def process(self, probeName, onMessageCallback, shutdownEvent):
        '''
        This is master loop where subscriber would get initialized and listen for messages. When a new message
        arrives, it extracts the message and handsover to the callback function that would been earlier registered
        '''

        self.initProbe()
        if self.ep != None :
            print("Starting Scan...", probeName)

            while True:
                if shutdownEvent.is_set() :
                    print("Got the event to shutdown...", probeName)
                    break
                statuses = self.ss.poll()
                for s in statuses:
                    if s.code() in (broker.SC.PeerLost, broker.SC.EndpointUnreachable):
                        print("Broker connection lost...")
                        self.initProbe()
                        print("Connection reinitialized.")
                        continue

                # Busy poll for a message or later status
                msg = self.sub.get(0.5)
                if msg is None:
                    continue
                (topic, msgData) = msg
                event_info = broker.zeek.Event(msgData)
                event_data =list(event_info.args())
                print("Event Info", event_data)
                self.onMessageCallback(event_data)
 
