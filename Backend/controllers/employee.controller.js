const employeeModel = require("../models/employee.model");

// get all employee list
exports.getEmployeesList = (req, res) => {
  employeeModel.getAllEmployees((err, employees) => {
    console.log("We are here");
    if (err) {
      res.send(err);
    } else {
      console.log("Employees: ", employees);
      res.send(employees);
    }
  });
};

// get employee by Name for search by Name
exports.getEmployeeByName = (req, res) => {
  employeeModel.getEmployeeByName(req.params.first_name, (err, employee) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Single Employee Data from Search: ", employee);
      res.send(employee);
    }
  });
};

// create new employee
exports.createNewEmployee = (req, res) => {
  const employeeReqData = new employeeModel(req.body);
  console.log("employeeReqData", employeeReqData);
  // check null;
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all fields " });
  } else {
    employeeModel.createEmployee(employeeReqData, (err, employee) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: true,
          message: "Employee Created Successfully ",
          data: employee.insertId,
        });
      }
    });
  }
};

// get employee by ID  for Update
exports.getEmployeeByID = (req, res) => {
  employeeModel.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) res.send(err);
    console.log("Single Employee Data", employee);
    res.send(JSON.stringify({ status: 200, error: null, response: employee }));
  });
};

// update employee
exports.updateEmployee = (req, res) => {
  const employeeReqData = new employeeModel(req.body);
  console.log("employeeReqData Update", employeeReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ success: false, message: "Please fill all fields" });
  } else {
    employeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Employee updated Successfully" });
      }
    );
  }
};

// delete employee
exports.deleteEmployee = (req, res) => {
  employeeModel.deleteEmployee(req.params.id, (err, employee) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Employee deleted Successfully!" });
  });
};
