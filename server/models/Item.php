<?php

namespace micro\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

class Item extends ActiveRecord
{
    const SCENARIO_LOGIN = 'login';
    const SCENARIO_REGISTER = 'register';

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        // $scenarios[self::SCENARIO_LOGIN] = ['name', 'password'];
        // $scenarios[self::SCENARIO_REGISTER] = ['name', 'email', 'password'];
        return $scenarios;
    }

    public static function tableName()
    {
        return '{{item}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['name', 'string', 'min' => 2, 'max' => 255],
            ['quantity', 'integer'],
            ['category', 'string', 'min' => 2, 'max' => 255],
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

}
