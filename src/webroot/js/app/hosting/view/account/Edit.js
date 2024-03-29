Ext.define('labinfsis.hosting.view.account.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.formaccount',
    title : 'Edit Account',
    layout: 'fit',
    autoShow: true,
    modal:true,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            items: [
            {
                xtype: 'textfield',
                name : 'name',
                fieldLabel: 'Name'
            },{
                xtype: 'textfield',
                name : 'email',
                fieldLabel: 'Email'
            }]
        }];

        this.buttons = [{
            text: 'Save',
            action: 'save'
        },{
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});