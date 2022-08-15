{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "nginx"
  },
  "spec": {
    "containers": [
      {
        "image": "nginx",
        "name": "web",
        "ports": [
          {
            "containerPort": 80,
            "name": "web"
          }
        ]
      }
    ]
  }
}
