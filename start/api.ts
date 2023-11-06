import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('dispatch-pdf', 'DispatchPdfsController.dispatch')
  Route.post('sugest', 'SugestionsController.sugest')
  Route.post('describe', 'SugestionsController.describe')
  Route.post('question', 'SugestionsController.question')
}).prefix('api')
