let employees = [];

// Çalışan ekleme
document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    let name = document.getElementById('name').value;
    let age = parseInt(document.getElementById('age').value);
    let department = document.getElementById('department').value;
    let salary = parseFloat(document.getElementById('salary').value);

    if (!name || age < 18 || salary < 0) {
        alert("Geçersiz bilgi. Lütfen tüm bilgileri doğru girdiğinizden emin olun.");
        return;
    }

    if (employees.some(emp => emp.name === name)) {
        alert("Bu isimde bir çalışan zaten var.");
        return;
    }

    employees.push({ name, age, department, salary });
    alert(`${name} isimli çalışan başarıyla eklendi.`);
    displayEmployees();
    document.getElementById('employeeForm').reset();
});

// Çalışanları listeleme
function displayEmployees() {
    let employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';

    employees.forEach(employee => {
        let listItem = document.createElement('li');
        listItem.textContent = `${employee.name} - Yaş: ${employee.age}, Departman: ${employee.department}, Maaş: ${employee.salary}`;
        
        // Silme butonu ekleniyor
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.onclick = function() {
            deleteEmployee(employee.name);
        };

        listItem.appendChild(deleteButton);
        employeeList.appendChild(listItem);
    });
}

// Çalışan Silme
function deleteEmployee(name) {
    const index = employees.findIndex(emp => emp.name === name);
    if (index === -1) {
        alert("Silinecek çalışan bulunamadı.");
        return;
    }

    employees.splice(index, 1);
    alert(`${name} isimli çalışan silindi.`);
    displayEmployees();
}

// Departmana göre çalışan listeleme
document.getElementById('listByDepartment').addEventListener('click', function() {
    const department = document.getElementById('filterDepartment').value;
    let filteredEmployees = employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());

    if (filteredEmployees.length === 0) {
        alert("Bu departmanda çalışan bulunmamaktadır.");
    } else {
        displayFilteredEmployees(filteredEmployees);
    }
});

// Maaşa göre sıralama
document.getElementById('sortBySalary').addEventListener('click', function() {
    const order = document.getElementById('sortOrder').value;
    let sortedEmployees = [...employees];

    if (order === 'asc') {
        sortedEmployees.sort((a, b) => a.salary - b.salary);
    } else if (order === 'desc') {
        sortedEmployees.sort((a, b) => b.salary - a.salary);
    }

    if (sortedEmployees.length === 0) {
        alert("Listelenecek çalışan yok.");
    } else {
        displayFilteredEmployees(sortedEmployees);
    }
});

// Maaşa göre filtreleme
document.getElementById('filterBySalary').addEventListener('click', function() {
    const threshold = parseFloat(document.getElementById('salaryThreshold').value);
    let filteredEmployees = employees.filter(emp => emp.salary < threshold);

    if (filteredEmployees.length === 0) {
        alert(`Maaşı ${threshold} TL'nin altında çalışan yok.`);
    } else {
        displayFilteredEmployees(filteredEmployees);
    }
});

// En yüksek maaşlı çalışanı bulma
document.getElementById('highestSalary').addEventListener('click', function() {
    if (employees.length === 0) {
        alert("Hiç çalışan bulunmamaktadır.");
        return;
    }

    let highestSalaryEmployee = employees.reduce((max, emp) => emp.salary > max.salary ? emp : max, employees[0]);
    alert(`En yüksek maaşlı çalışan: ${highestSalaryEmployee.name}, Maaş: ${highestSalaryEmployee.salary}`);
});

// Toplam maaş hesaplama
document.getElementById('totalSalary').addEventListener('click', function() {
    let totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    alert(`Toplam maaş: ${totalSalary} TL`);
});

// Filtrelenmiş çalışanları gösterme
function displayFilteredEmployees(filteredEmployees) {
    let employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';

    filteredEmployees.forEach(employee => {
        let listItem = document.createElement('li');
        listItem.textContent = `${employee.name} - Yaş: ${employee.age}, Departman: ${employee.department}, Maaş: ${employee.salary}`;
        
        // Silme butonu ekleniyor
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.onclick = function() {
            deleteEmployee(employee.name);
        };

        listItem.appendChild(deleteButton);
        employeeList.appendChild(listItem);
    });
}
