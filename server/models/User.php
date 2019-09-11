<?php

namespace micro\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

class User extends ActiveRecord
{
    const SCENARIO_LOGIN = 'login';
    const SCENARIO_REGISTER = 'register';

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_LOGIN] = ['name', 'password'];
        $scenarios[self::SCENARIO_REGISTER] = ['name', 'email', 'password'];
        return $scenarios;
    }

    public static function tableName()
    {
        return '{{user}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['name', 'filter', 'filter' => 'trim'],
            ['name', 'required'],
            ['name', 'unique', 'targetClass' => '\micro\models\User', 'message' => 'This name has already been taken.'],
            ['name', 'string', 'min' => 2, 'max' => 255],

            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\micro\models\User', 'message' => 'This email address has already been taken.'],

            ['password', 'required'],
            ['password', 'string', 'min' => 3],
            [['name', 'password', 'email'], 'safe', 'on' => User::SCENARIO_REGISTER],
        ];
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => 'updated_at',
                'value' => new Expression('NOW()'),
            ],
        ];
    }

    /**
     * This is must for mass assignment to work if the model has no related formModel
     * Override parents method
     * @return string
     */
    public function formName()
    {
        return '';
    }

    public function generateAccessToken($expireInSeconds = 60 * 5)
    {
        return Yii::$app->security->generateRandomString() . '_' . (time() + $expireInSeconds);
    }

    public function isAccessTokenValid()
    {
        if (!empty($this->token)) {
            $timestamp = (int)substr($this->token, strrpos($this->token, '_') + 1);
            return $timestamp > time();
        }
        return false;
    }

    public function register()
    {
        $this->token = $this->generateAccessToken();

        if ($this->save(true)) {
            return true;
        }

        return false;
    }

    public function beforeSave($insert)
    {
        $this->password = md5($this->password);
        return parent::beforeSave($insert);
    }
}
