import { IListener } from '../listener';
import { pt_Br } from '../../i18n/pt_Br';
import { ListenerSpec } from '../listenerSpec';
const gameLoop = require('../../utils/gameLoop');

@ListenerSpec("ready")
export class ReadyEvent implements IListener {

    execute(client: import('discord.js').Client): void {
        gameLoop.run(client);
        console.log(pt_Br.readyMessage);
    }
}
