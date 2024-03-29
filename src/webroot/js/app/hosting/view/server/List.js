Ext.define('labinfsis.hosting.view.server.List' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.servers',
    layout: 'fit',
    autoShow: true,
    modal:true,
    width: 520,
    height: 415,
    iconCls:'icon-list',
    title: 'Lista de Servidores ',
    initComponent: function() {
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            listeners:{
                'selectionchange': this.selectChange,
                scope: this
            }
        });
        this.listeners = {
            'destroy': function(window, options){
                Ext.data.StoreManager.lookup('Servers').clearFilter();
            },
            'hide': function(window, options){
                Ext.data.StoreManager.lookup('Servers').clearFilter();
            }
        }
        this.items=[{
            id: 'list-servers',
            singleSelect: true,
            overItemCls: 'x-view-over',
            itemSelector: 'div.thumb-wrap',
            xtype:'dataview',
            store: 'Servers',
            listeners: {
                scope: this,
                selectionchange: this.selectChange
            },
            tpl: [
                // '<div class="details">',
                '<tpl for=".">',
                '<div class="thumb-wrap <tpl if="is_saved == false">icon-error</tpl> <tpl if="is_saved == true">icon-ok</tpl>" data-qtip="<b>Nombre:</b> {server_name} <br ><b>Diretorio de trabajo:</b>{work_dir}<br><b>Descripción:</b>{server_description}">',
                '<div class="thumb">',
                (!Ext.isIE6? '<img src="/img/icons/hosting/server/generic_server.png" />' : '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/img/icons/hosting/server/generic_server.png\')"></div>'),
                '</div>',
                '<span>{serverShortName}</span>',
                '</div>',
                '</tpl>'
                // '</div>'
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    serverShortName: Ext.util.Format.ellipsis(data.server_name, 10)
                });
                return data;
            }
        }];
        
        this.tbar =[{
            title: 'Acciones',
            xtype: 'buttongroup',
            columns: 3,
            items:[{
                xtype: 'buttongroup',
                items:{
                    scale: 'large',
                    text: 'Registrar',
                    action: 'add',
                    iconAlign: 'top',
                    iconCls: 'icon-add-server'
                }
            },{
                xtype: 'buttongroup',
                defaults:{
                    scale: 'large',
                    iconAlign: 'top'
                },
                items:[{
                    text: 'Modificar',
                    iconCls: 'icon-edit-server',
                    action: 'edit',
                    disabled:true
                },{
                    text: 'Eliminar',
                    iconCls:'icon-delete-server',
                    action:'delete',
                    disabled:true
                }]
            },{
                xtype: 'buttongroup',
                items:{
                    scale: 'large',
                    text: 'Sincronizar',
                    action: 'syncdata',
                    iconAlign: 'top',
                    iconCls: 'icon-refresh-aux'
                }
            }]
        },{
            title: 'Reportes',
            xtype: 'buttongroup',
            columns: 4,
            defaults:{
                scale: 'large',
                iconAlign: 'top'
            },
            items:[{
                xtype: 'buttongroup',
                defaults:{
                    scale: 'large',
                    iconAlign: 'top'
                },
                items:[{
                    text: 'Informaci&oacute;n',
                    iconCls: 'icon-information-server',
                    action:'info',
                    disabled:true
                },{
                    text: 'Estadisticas',
                    iconCls: 'icon-statistics-server',
                    action:'statistics',
                    disabled:true
                },{
                    text: 'Visor de eventos',
                    iconCls:'icon-diagnosis-server',
                    action:'eventviewer',
                    disabled:true
                }]
            }]
        }];
        this.bbar=[Ext.create('Ext.PagingToolbar', {
                store: Ext.data.StoreManager.lookup('Servers'),
                border: false,
                pageSize: 5,
                items: [
                    '-', {
                        xtype: 'searchfield',
                        name: 'filter',
                        fieldLabel: 'Search',
                        labelWidth: 40,
                        width: 200,
                        store: Ext.data.StoreManager.lookup('Servers')
                    }]
            })];
        this.callParent(arguments);
    },

    filter: function(field, newValue) {
        var store = this.down('dataview').store,
        dataview = this.down('dataview');
        store.suspendEvents();
        store.clearFilter();
        dataview.getSelectionModel().clearSelections();
        store.resumeEvents();
        store.filter({
            property: 'server_name',
            anyMatch: true,
            value   : newValue
        });
    },

    sort: function() {
        var field = this.down('combobox').getValue();
        this.down('dataview').store.sort(field, 'ASC');
    },

    selectChange: function(dataview, selections ){
        var bedit = this.down('button[action=edit]');
        var bdelete = this.down('button[action=delete]');
        var bdinfo = this.down('button[action=info]');
        var bdviewer = this.down('button[action=eventviewer]');
        var bdstatistic = this.down('button[action=statistics]');
        if(selections.length > 0){
            bdelete.enable();
            bdstatistic.enable();
            if(selections.length == 1){
                bedit.enable();
                bdinfo.enable();
                bdviewer.enable()
            }else{
                bedit.disable();
                bdinfo.disable();
                bdviewer.disable()
            }
        }else{
            bedit.disable();
            bdelete.disable();
            bdinfo.disable();
            bdviewer.disable();
            bdstatistic.disable();
        }
    }

});