import { Client } from "discord.js";

export interface IListener {
    execute(client: Client) : void;
}