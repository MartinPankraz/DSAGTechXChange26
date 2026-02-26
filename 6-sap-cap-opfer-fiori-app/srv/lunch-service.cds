using sap.lunch as db from '../db/schema';

service LunchService @(path: '/lunch') {

  entity LunchOrders as projection on db.LunchOrders;
  entity MenuItems   as projection on db.MenuItems;
   // Security Training: search endpoint
  function searchMenuItems(query : String) returns array of MenuItems;

}

annotate LunchService.LunchOrders with @(
  UI.LineItem: [
    { Value: employeeName,  Label: 'Employee'     },
    { Value: mealType,      Label: 'Meal'         },
    { Value: quantity,      Label: 'Quantity'     },
    { Value: orderDate,     Label: 'Order Date'   },
    { Value: status,        Label: 'Status'       }
  ],
  UI.HeaderInfo: {
    TypeName: 'Lunch Order',
    TypeNamePlural: 'Lunch Orders',
    Title: { Value: employeeName }
  },
  UI.FieldGroup #Main: {
    Data: [
      { Value: employeeName         },
      { Value: mealType             },
      { Value: dietaryRestrictions  },
      { Value: quantity             },
      { Value: orderDate            },
      { Value: status               }
    ]
  },
  UI.Facets: [{
    $Type  : 'UI.ReferenceFacet',
    Target : '@UI.FieldGroup#Main',
    Label  : 'Order Details'
  }]
);

annotate LunchService.MenuItems with @(
  UI.LineItem: [
    { Value: name,        Label: 'Dish'        },
    { Value: category,    Label: 'Category'    },
    { Value: description, Label: 'Description' },
    { Value: available,   Label: 'Available'   }
  ],
  UI.HeaderInfo: {
    TypeName: 'Menu Item',
    TypeNamePlural: 'Menu Items',
    Title: { Value: name }
  },
  UI.FieldGroup #Main: {
    Data: [
      { Value: name        },
      { Value: category    },
      { Value: description },
      { Value: available   }
    ]
  },
  UI.Facets: [{
    $Type  : 'UI.ReferenceFacet',
    Target : '@UI.FieldGroup#Main',
    Label  : 'Item Details'
  }]
);