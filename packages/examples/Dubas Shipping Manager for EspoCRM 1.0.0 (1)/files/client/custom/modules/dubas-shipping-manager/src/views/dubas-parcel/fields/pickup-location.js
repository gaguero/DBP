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

Espo.define('dubas-shipping-manager:views/dubas-parcel/fields/pickup-location', 'views/fields/link', function (Dep) {

    return Dep.extend({

        forceSelectAllAttributes: true,

        select: function (model) {
            Dep.prototype.select.call(this, model);

            this.model.set('pickupAddressStreet', model.get('addressStreet'));
            this.model.set('pickupAddressCity', model.get('addressCity'));
            this.model.set('pickupAddressState', model.get('addressState'));
            this.model.set('pickupAddressCountry', model.get('addressCountry'));
            this.model.set('pickupAddressPostalCode', model.get('addressPostalCode'));

            this.model.set('pickupInstructions', model.get('instructions'));
            this.model.set('senderContactId', model.get('contactId'));
            this.model.set('senderContactName', model.get('contactName'));
        },

        getSelectFilters: function () {
            if (this.model.get('senderId')) {
                return {
                    'account': {
                        type: 'equals',
                        attribute: 'accountId',
                        value: this.model.get('senderId'),
                        data: {
                            type: 'is',
                            nameValue: this.model.get('senderName')
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
                        value: ['Pickup'],
                        data: {
                            type: 'anyOf',
                            valueList: ['Pickup']
                        }
                    }
                };
            }
        },

        getCreateAttributes: function () {
            if (this.model.get('senderId')) {
                return {
                    accountId: this.model.get('senderId'),
                    accountName: this.model.get('senderName')
                }
            }
        }

    });

});
