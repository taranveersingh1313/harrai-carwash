 
import Customer from "../../Models/Admin/CustomerModel.js";


export const getList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

    const { customers, total } = await Customer.getList(limit, offset, search);

    return res.status(200).json({
      success: true,
      data: customers,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const SaveCustomer = async (req, res) => {
  try {
    const created_by = req.admin.email;
    console.log("Created by:", created_by);
    

    const newCustomer = await Customer.SaveCustomer(req.body, created_by); // DB function
    
    console.log(newCustomer);
    

    return res.status(200).json({
      success: true,
      data: newCustomer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to save customer",
      error: err.message,
    });
  }
};


export const EditCustomer = async (req, res) => {
  try {
    const customers = await Customer.EditCustomer(req.params.id); // DB function

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: err.message,
    });
  }
};


export const UpdateCustomer = async (req, res) => {
  try {
    const updateCustomer = await Customer.UpdateCustomer(req.params.id, req.body); // DB function
    
    console.log(updateCustomer);
    

    return res.status(200).json({
      success: true,
      data: updateCustomer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: err.message,
    });
  }
};


export const DeleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const result = await Customer.DeleteCustomer(customerId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      data: {
        id: result.id,
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: err.message,
    });
  }
};
