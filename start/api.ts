import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('dispatch-pdf', 'DispatchPdfsController.dispatch')
}).prefix('api')
