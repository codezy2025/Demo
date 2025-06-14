/**
 * 🏗️  DEVELOPMENT GUIDE - Form27 Service
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
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Form27[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form27Stats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { Form27, Form27Create, Form27Update } from '../types/Form27Types';

const API_BASE_URL = '/api/form27';

const getAll = async (): Promise<Form27[]> => {
    const response = await axios.get<Form27[]>(API_BASE_URL);
    return response.data;
};

const create = async (formData: Form27Create): Promise<Form27> => {
    const response = await axios.post<Form27>(API_BASE_URL, formData);
    return response.data;
};

const update = async (id: string, formData: Form27Update): Promise<Form27> => {
    const response = await axios.put<Form27>(`${API_BASE_URL}/${id}`, formData);
    return response.data;
};

const deleteById = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const form27Service = {
    getAll,
    create,
    update,
    delete: deleteById,
};