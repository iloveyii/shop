<?php


namespace micro\controllers;

use yii\rest\ActiveController;
use micro\models\User;
use micro\models\Item;
use Yii;


class ItemController extends ActiveController
{
    public $modelClass = 'micro\models\Item';

    /**
     * Remove rateLimiter which requires an authenticated user to work
     * @return array
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        unset($behaviors['rateLimiter']);
        $cors = [
            'corsFilter'=> [
                'class'=>'\yii\filters\Cors::className()'
            ]
        ];
        $behaviors['corsFilter'] = [
            'class'=>\yii\filters\Cors::class,
        ];
        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        unset($actions['index']);
        unset($actions['delete']);
        unset($actions['update']);
        return $actions;
    }

    /**
     * @return array
     */
    public function actionLogin()
    {
        $name = Yii::$app->request->post('name');
        $password = Yii::$app->request->post('password');

        $user = User::findOne(['name' => $name, 'password' => md5($password)]);


        if (isset($user)) {
            $user->token = $user->generateAccessToken();
            $user->save(false);
            $data = [
                'token' =>  $user->token
            ];

            return $data;
        }

        Yii::$app->response->statusCode = 401;
        $data = [
            'error' =>  'Username or password is invalid'
        ];

        return $data;
    }


    /**
     * This method is used to register a user by calling endpoint like POST users/register
     * Required parameters are name, email and password
     * @return array|mixed
     */
    public function actionRegister()
    {
        $model = new User(['scenario' => User::SCENARIO_REGISTER]);

        if($model->load(Yii::$app->request->post()) && $model->register()) {
            Yii::$app->response->statusCode = 201;
            $data = [
                'token' =>  $model->token
            ];
            return $data;
        }

        // Model has errors
        Yii::$app->response->statusCode = 401;
        return $model->errors;
    }

    /**
     * @param $id
     * @return array
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException
     */
    public function actionDelete($id)
    {
        $item = Item::findOne($id);
        if( ! is_null($item)) {
            $item->delete();
        }

        return ['status' => true, 'models'=>Item::find()->all()];
    }

    public function actionUpdate() {
        $post = Yii::$app->getRequest()->getBodyParams();
        $model = Item::findOne($post['id']);
        $model->attributes = $post;
        $model->save(false);
        $model->refresh();
        return ['status' => true, 'models'=>Item::find()->all()];
    }

    public function actionCreate() {
        $post = Yii::$app->getRequest()->getBodyParams();
        // print_r($post);
        $model = new Item();
        $model->attributes = $post['item'];
        $model->save(false);
        $model->refresh();
        return ['status' => true, 'models'=>Item::find()->all()];
    }

    public function actionIndex() {
        return ['status' => true, 'models'=>Item::find()->all()];
    }
}
