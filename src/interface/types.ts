import { Application } from 'express';
import { Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';
import { TneLogger } from '@tne/logger';

export type appType = Application;
export type serverType = httpServer | httpsServer;
export type loggerType = TneLogger;
export type protocolType = 'http' | 'https';
