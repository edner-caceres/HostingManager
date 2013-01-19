<?php

App::uses('AppModel', 'Model');

/**
 * Account Model
 *
 * @property User $User
 * @property QuotaLimit $QuotaLimit
 * @property QuotaTally $QuotaTally
 * @property Server $Server
 */
class Account extends AppModel {

    /**
     * Display field
     *
     * @var string
     */
    public $displayField = 'account_name';

    /**
     * Validation rules
     *
     * @var array
     */
    public $validate = array(
        'user_id' => array(
            'notempty' => array(
                'rule' => array('notempty'),
                'message' => 'El usuario es requerido para crear la cuenta'
            //'allowEmpty' => false,
            //'required' => false,
            //'last' => false, // Stop validation after this rule
            //'on' => 'create', // Limit validation to 'create' or 'update' operations
            )
        ),
        'account_name' => array(
            'notempty' => array(
                'rule' => array('notempty'),
                'message' => 'Nombre de la cuenta es requerido'
            //'allowEmpty' => false,
            //'required' => false,
            //'last' => false, // Stop validation after this rule
            //'on' => 'create', // Limit validation to 'create' or 'update' operations
            )
        ),
        'account_password' => array(
            'notempty' => array(
                'rule' => array('notempty'),
                'message' => 'Password es requerido'
            //'allowEmpty' => false,
            //'required' => false,
            //'last' => false, // Stop validation after this rule
            //'on' => 'create', // Limit validation to 'create' or 'update' operations
            )
        ),
        'home_dir' => array(
            'notempty' => array(
                'rule' => array('notempty'),
                'message' => 'Home dir es requerido'
            //'allowEmpty' => false,
            //'required' => false,
            //'last' => false, // Stop validation after this rule
            //'on' => 'create', // Limit validation to 'create' or 'update' operations
            )
        ),
        /*'expired' => array(
            'datetime' => array(
                'rule' => array('date'),
                'message' => 'Fecha de expiracion de la cuenta es requerido'
            //'allowEmpty' => false,
            //'required' => false,
            //'last' => false, // Stop validation after this rule
            //'on' => 'create', // Limit validation to 'create' or 'update' operations
            ),
        ),*/
    );

    //The Associations below have been created with all possible keys, those that are not needed can be removed

    /**
     * belongsTo associations
     *
     * @var array
     */
    public $belongsTo = array(
        'User' => array(
            'className' => 'User',
            'foreignKey' => 'user_id',
            'conditions' => '',
            'fields' => '',
            'order' => ''
        )
    );

    /**
     * hasMany associations
     *
     * @var array
     */
    public $hasMany = array(
        'QuotaLimit' => array(
            'className' => 'QuotaLimit',
            'foreignKey' => 'account_id',
            'dependent' => false,
            'conditions' => '',
            'fields' => '',
            'order' => '',
            'limit' => '',
            'offset' => '',
            'exclusive' => '',
            'finderQuery' => '',
            'counterQuery' => ''
        ),
        'QuotaTally' => array(
            'className' => 'QuotaTally',
            'foreignKey' => 'account_id',
            'dependent' => false,
            'conditions' => '',
            'fields' => '',
            'order' => '',
            'limit' => '',
            'offset' => '',
            'exclusive' => '',
            'finderQuery' => '',
            'counterQuery' => ''
        )
    );

    /**
     * hasAndBelongsToMany associations
     *
     * @var array
     */
    public $hasAndBelongsToMany = array(
        'Server' => array(
            'className' => 'Server',
            'joinTable' => 'accounts_servers',
            'foreignKey' => 'account_id',
            'associationForeignKey' => 'server_id',
            'unique' => 'keepExisting',
            'conditions' => '',
            'fields' => '',
            'order' => '',
            'limit' => '',
            'offset' => '',
            'finderQuery' => '',
            'deleteQuery' => '',
            'insertQuery' => ''
        )
    );

}
