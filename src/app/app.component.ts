import { Component, OnInit } from '@angular/core';

import * as motorcortex from '../../scripts/motorcortex.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const motorcortexTypes = new motorcortex.MessageTypes();
    motorcortexTypes.load([
      {
        proto: 'assets/msg/motorcortex.proto',
        hash: 'assets/msg/motorcortex_hash.json'
      },
      {
        proto: 'assets/msg/motion.proto',
        hash: 'assets/msg/motion_hash.json'
      }
    ]).then(types => {
      console.log('Motorcortex types loaded');
      console.log('Motorcortex request connect to 5558');

      // Request
      const req = new motorcortex.Request(motorcortexTypes);
      req.connect('ws://172.20.3.29:5558').then(() => {
        console.log('Motorcortext request connection is established');
        req.getParameterTree().then(tree => {
          console.log(tree);
          // safe to set parameter
          req.getParameter('root/Ethercat/axis1/error').then(parameter => {
            console.log(parameter);
          });
          req.getParameterList(['root/Ethercat/axis1/error', 'root/Ethercat/axis2/error']).then(parameters => {
            console.log(parameters);
          });
          req.setParameter('root/Ethercat/axis1/device/Rx PDO Mapping/Target Velocity', 666);
          req.setParameterList(
            [
              {
                path: 'root/Ethercat/axis1/device/Rx PDO Mapping/Target Velocity',
                value: 123,
                options: []
              },
              {
                path: 'root/Ethercat/axis2/device/Rx PDO Mapping/Target Velocity',
                value: 321,
                options: []
              }
            ]
          );
          // Request ESI
          const foeRequest = motorcortexTypes.createType('motion.FoERequest');
          foeRequest.device_id = 1;
          foeRequest.file_name = 'test.xml';

          console.log(foeRequest);

          req.send(req.encode(foeRequest), 1000000).then(function (msg) {
            const decoder = motorcortexTypes.createType('motion.FoEContentMsg');
            const decodedMsg = decoder.decode(msg.value);
            console.log(decodedMsg);
          });
        });
      });

      // Subscription
      const sub = new motorcortex.Subscribe(req);
      sub.connect('ws://172.20.3.29:5557').then(() => {
        console.log('Subscribe connection is established');
        const errorGroupSubscription = sub.subscribe(['root/Ethercat/axis1/error'], 'errorGroup', 5000);
        errorGroupSubscription.then(subscription => {
          console.log(subscription);
          errorGroupSubscription.notify(parameters => {
            console.log(parameters);
          });
        });
      }).catch(error => {
        console.log(error);
      });

    }).catch(error => {
      console.error('Failed to load motorcortex message types!', error);
    });
  }

}
