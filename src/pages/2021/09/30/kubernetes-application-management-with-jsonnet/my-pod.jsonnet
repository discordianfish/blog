local nginx = import 'nginx.jsonnet';

nginx {
  metadata+: {
    name: 'webserver',
  },
  spec+: {
    containers: [
      nginx.spec.containers[0] {
        resources: {
          limits: {
            cpu: '100m',
            memory: '64Mi',
          },
        },
      },
    ],
  },
}
