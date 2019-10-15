export function ListenerSpec(listenerName: string) {
           return function(constructor: Function) {
               console.log('-- decorator invoked --');
               constructor.prototype.listenerName = listenerName;
           };
       }