/************************************************************************
This file is part of the Dubas Shipping Manager - EspoCRM extension.

DUBAS S.C. - contact@dubas.pro
Copyright (C) 2022 Arkadiy Asuratov, Emil Dubielecki

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
************************************************************************/

Espo.define('dubas-shipping-manager:views/dubas-parcel/fields/delivery-location', 'views/fields/link', function (Dep) {

    return Dep.extend({

        forceSelectAllAttributes: true,

        select: function (model) {
            Dep.prototype.select.call(this, model);

            this.model.set('deliveryAddressStreet', model.get('addressStreet'));
            this.model.set('deliveryAddressCity', model.get('addressCity'));
            this.model.set('deliveryAddressState', model.get('addressState'));
            this.model.set('deliveryAddressCountry', model.get('addressCountry'));
            this.model.set('deliveryAddressPostalCode', model.get('addressPostalCode'));

            this.model.set('deliveryInstructions', model.get('instructions'));
            this.model.set('recipientContactId', model.get('contactId'));
            this.model.set('recipientContactName', model.get('contactName'));
        },

        getSelectFilters: function () {
            if (this.model.get('recipientId')) {
                if (this.model.get('parcelType') === 'Delivery') {
                    return {
                        'account': {
                            type: 'equals',
                            attribute: 'accountId',
                            value: this.model.get('recipientId'),
                            data: {
                                type: 'is',
                                nameValue: this.model.get('recipientName')
                            }
                        },
                        'status': {
                            type: 'in',
                            attribute: 'status',
                            value: ['Available'],
                            data: {
                                type: 'is',
                                nameValue: 'Available'
                            }
                        },
                        'typeOfLocation': {
                            type: 'arrayAnyOf',
                            attribute: 'typeOfLocation',
                            value: ['Delivery'],
                            data: {
                                type: 'anyOf',
                                valueList: ['Delivery']
                            }
                        }
                    };
                } else {
                    return {
                        'status': {
                            type: 'in',
                            attribute: 'status',
                            value: ['Available'],
                            data: {
                                type: 'is',
                                nameValue: 'Available',
                            }
                        },
                        'typeOfLocation': {
                            type: 'arrayAnyOf',
                            attribute: 'typeOfLocation',
                            value: ['Pickup Point'],
                            data: {
                                type: 'anyOf',
                                valueList: ['Pickup Point']
                            }
                        }
                    };
                }
            }
        },

        getCreateAttributes: function () {
            if (this.model.get('recipientId')) {
                return {
                    accountId: this.model.get('recipientId'),
                    accountName: this.model.get('recipientName')
                }
            }
        }

    });

});
