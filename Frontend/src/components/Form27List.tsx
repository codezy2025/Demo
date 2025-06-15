/**
 * 🏗️  DEVELOPMENT GUIDE - Form27 Form Component
 * 
 * 📋 Original Requirements: # Comprehensive Documentation for Form27 (Add/Edit User)

## 1. Purpose
Form27 is a user management form in the Student Information System (SIS) that allows administrators to:
- Add new user accounts to the system
- Edit existing user account information
- Set user types (Admin/User)
- Manage passwords for system access

## 2. Database Schema Integration
Form27 interacts with the following database tables:

### Users Table
| Column | Data Type | Description | Constraints |
|--------|-----------|-------------|-------------|
| ID | Integer | Auto-incrementing user ID | Primary Key |
| Username | Text (150) | Login username | Required, Unique |
| UserType | Text | "Admin" or "User" | Required |
| Password | Text | Login password | Required |

## 3. Form Layout and Controls

### Form Properties
- **Name**: Form27
- **Caption**: "Add New Section" (changes to "Edit Existing User" in edit mode)
- **BorderStyle**: Fixed Single
- **MDIChild**: True (runs within main MDI form)

### Controls
1. **Text1 (Username)**
   - MaxLength: 150 characters
   - Label: "User Name:"

2. **Text2 (UserType - ComboBox)**
   - Items: "User", "Admin"
   - Default: "User"
   - Label: "Required Average Grade:" (mislabeled, should be "User Type")

3. **Text3 (Password)**
   - Label: "Password:"

4. **Command Buttons**
   - Command1 ("Update"): Saves changes
   - Command2 ("Cancel"): Closes form

## 4. Functional Logic

### Key Variables
- `Public add_state As Boolean`: Determines if form is in Add (True) or Edit (False) mode

### Form Events

#### Form_Load()
- Positions form using saved coordinates
- In Edit mode:
  - Populates fields from `rs_log` recordset
  - Changes form caption/icon
  - Fields populated:
    - Text1 = Username
    - Text2 = UserType
    - Text3 = Password

#### Command1_Click() (Update)
1. Validation:
   - Checks for empty username/password
   - Validates UserType is either "User" or "Admin"

2. Database Operations:
   - Add mode: Creates new record with auto-generated ID
   - Edit mode: Updates existing record
   - Updates current user session if editing own account

3. Post-Save Actions:
   - Refreshes user list in Form26
   - Maintains selection position
   - Provides success messages
   - In Add mode, offers option to add another user

#### Command2_Click() (Cancel)
- Closes form without saving

#### Text2_Validate()
- Ensures only valid user types are selected

#### Text2_KeyPress()
- Prevents manual text entry in UserType combo box

## 5. Code Implementation

```vb
' Main update function
Private Sub Command1_Click()
    ' Input validation
    If is_empty(Text1) = True Then Exit Sub
    If is_empty(Text3) = True Then Exit Sub
    
    ' Database operation
    With rs_log
        If add_state = True Then .AddNew
            .Fields(1) = Text1.Text    ' Username
            .Fields(2) = Text2.Text    ' UserType
            .Fields(3) = Text3.Text    ' Password
        .Update
    End With
    
    ' Post-save handling
    If add_state = True Then
        ' Add mode logic
        MsgBox "Adding of new user has been successfull.", vbInformation, "CSRS version 1"
        Dim rep As Integer
        rep = MsgBox("Do you want to add another user?", vbQuestion + vbYesNo, "CSRS version 1")
        If rep = vbYes Then
            ' Clear fields for new entry
            Text1.Text = ""
            Text2.Text = "User"
            Text3.Text = ""
            Text1.SetFocus
            rs_log.Requery
            Form26.load_rec
        Else
            ' Close after adding
            rs_log.Requery
            Form26.load_rec
            Unload Me
        End If
    Else
        ' Edit mode logic
        If LCase(user_name) = LCase(Text1.Text) Then
            ' Update current session if editing own account
            user_name = Text1.Text
            user_type = Text2.Text
            MDIForm1.StatusBar1.Panels.Item(3).Text = user_name
        End If
        
        MsgBox "Changes in record has been successfully saved.", vbInformation, "CSRS version 1"
        Dim pos As Long
        
        ' Maintain list position
        pos = rs_log.AbsolutePosition
        rs_log.Requery
        Form26.load_rec
        rs_log.AbsolutePosition = pos
        
        Form26.ListView1.ListItems.Item(pos).EnsureVisible
        Form26.ListView1.ListItems.Item(pos).Selected = True
        
        Unload Me
    End If
End Sub
```

## 6. Integration Points

### Parent Form (Form26)
- Form27 is called from Form26 (List of Users)
- Form26 passes the `rs_log` recordset
- Form26 is disabled while Form27 is open
- Form26's `load_rec()` is called after updates

### Database Connection
- Uses global `cn` connection object
- Operates on the `Users` table

## 7. Usage Scenarios

### Adding a New User
1. Form26 clicks "Add" button
2. Form27 opens in Add mode (empty fields)
3. Admin enters:
   - Username
   - Selects User Type
   - Sets Password
4. Clicks "Update"
5. System validates and saves new user

### Editing Existing User
1. Form26 selects user, clicks "Edit"
2. Form27 opens in Edit mode (pre-populated)
3. Admin makes changes
4. Clicks "Update"
5. System validates and saves changes

## 8. Error Handling
- Basic validation for required fields
- Prevents invalid UserType entries
- Maintains data integrity through:
  - Recordset requery after changes
  - Position preservation in list

## 9. Security Considerations
- Passwords are stored in plaintext (should be encrypted)
- UserType is restricted to predefined values
- Form maintains proper parent/child relationship with Form26

This documentation provides all necessary information to recreate Form27 with its complete functionality within the Student Information System.

 * 
 * 🚀 Enhancement Ideas:
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<Form27> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useTable } from 'react-table';
import { Form27Data } from '../types/Form27Types';

interface Form27ListProps {
  data: Form27Data[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Form27List: React.FC<Form27ListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'User Type',
        accessor: 'userType',
      },
      {
        Header: 'Actions',
        Cell: ({ row }: { row: { original: Form27Data } }) => (
          <div>
            <button onClick={() => onEdit(row.original.id)}>Edit</button>
            <button onClick={() => onDelete(row.original.id)}>Delete</button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: '1px solid black',
                  background: 'aliceblue',
                  padding: '8px',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Form27List;