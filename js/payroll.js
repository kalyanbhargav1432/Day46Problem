//** UC1 **//
class EmployeePayrollData{
    //geter and setter method
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }

    get name(){
return this._name;
    }
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-zA_Z\\s]{2,}$');
        if(nameRegex.test(name))
        this._name = name;
        else throw 'Name is Incorrect';
    }
    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }

    get gender(){return this._gender;}
    set gender(gender){
        this._gender = gender;
    }

    get department(){return this._department;}
    set department(department){
        this._department = department;
    }

    get salary(){return this._salary;}
    set salary(salary){
        this._salary = salary;
    }

    get note(){return this._note;}
    set note(note){
        this._note = note;
    }

    get startDate(){return this._startDate;}
    set startDate(startDate){
        this._startDate = startDate;
    }
    //method 
    toString(){
        const options = {year:'numeric',month:'long',day:'numeric'};
        const empDate = !this.startDate ? "undefined":this.startDate.toLocalDateString("en-US",options);
        return "id =" + this.id + ", name = '" + this.name + ", gender = '" +this.gender + ", profilePic = '" + this.profilePic + ", department =" + this.department + ", salary = " + this.salary + ", startDate = " + empDate + ", note = " + this.note;
    }
}
//** UC2 **//
let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function () {
            output.textContent = salary.value;
        });

        checkForUpdate();

});
//** UC3 , Uc4 **//
const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(EmployeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList" , JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
    employeePayrollData.department = getSelectedValues('[name = department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
// 1.querySelector is the newer feature.
// 2.The querySelector method can be used when selecting by element name,nesting or class name.
// 3.querySelector lets you find elements with rules that can't be expressed with getElementById.
const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}
// 1.getInputValueById is better supported than querySelector in older versions of the browsers.
// 2.The thing with getElementById is that it only allows to select an element by its id.
const getInputElementValue = (id) =>{
    let value = document.getElementById(id).value;
    return value;
}
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value === value)
        item.checked = true;
    });
}
//** UC5 **//
const resetForm = () =>{
    setValue('#name','');
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id,index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = jSON.parse(employeePayrollJson);
    setForm();
}