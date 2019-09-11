<?php

return [
    'id' => 'micro-service-shop-app',
    // the basePath of the application will be the `micro-app` directory
    'basePath' => __DIR__,
    // this is where the application will find all controllers
    'controllerNamespace' => 'micro\controllers',
    // set an alias to enable autoloading of classes from the 'micro' namespace
    'aliases' => [
        '@micro' => __DIR__,
    ],

    'components' => [
        'request' => php_sapi_name() == "cli" ? [] : [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'db2' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'sqlite:@micro/database.sqlite',
        ],
        'db' => [
            'class' => '\yii\db\Connection',
            'dsn' => 'mysql:unix_socket=/var/run/mysqld/mysqld.sock;dbname=shopping',
            'username' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'prefix' => 'api/v1',
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'item',
                    'extraPatterns' => [
                        'POST token' => 'create', // add path => actionName
                    ],
                ],
            ],
        ]
    ],
];
