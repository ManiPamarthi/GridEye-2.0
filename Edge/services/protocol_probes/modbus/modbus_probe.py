
import signal
import os
import sys
import threading
import time
import json

from lib.probe import Probe

class MODBUSProbe(Probe):
    def __init__(self, name, listenIP, listenPort, topic, shutdownEvent):
        super().__init__(name, topic, listenIP, listenPort, shutdownEvent)
        self.listenIP = listenIP
        self.listenPort = listenPort
        self.topic = topic
        self.ep = None
        self.sub = None
        self.ss = None
        super().setOnMessageCallback(self.modbusOnMessageCallback)

    def modbusOnMessageCallback(self, event_data):
        print(super().getProbeName(), "On Event", event_data)

