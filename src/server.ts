'use strict';

import { Client } from 'discord.js';

import config from './config.json';

export class Server {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public start(): void {
        
        this.loadEvents();
        this.loadCommands();

        this.client.login(config.token);
    }

    private loadEvents(): void {
        console.log('Loading');
    }

    private loadCommands(): void {
        console.log('Loading');
    }
}
