import dbConnect from "@/backend/dbConnect";
import { orderModel } from "@/backend/models";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "DELETE":
      try {
        const fetchOrder = await orderModel.findById(req.query.id);
        if (!fetchOrder) {
          return res.status(404).json({
            success: false,
            message: "Order Not Found!",
          });
        }

        const deleteOrder = await orderModel.findByIdAndDelete(req.query.id);

        if (!deleteOrder) {
          return res.status(400).json({
            success: false,
            message: "Unable to delete the Order!",
          });
        }

        res.status(200).json({
          success: true,
          message: "Order Deleted Successfully!",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Server Error!",
          error: error.message,
        });
      }
      break;
    case "PUT":
      try {
        const fetchOrder = await orderModel.findById(req.query.id);
        if (!fetchOrder) {
          return res.status(404).json({
            success: false,
            message: "Order Not Found!",
          });
        }

        const updateOrder = await orderModel.findByIdAndUpdate(
          req.query.id,
          req.body,
          { new: true }
        );

        res.status(200).json({
          success: true,
          message: "Order Status Updated Successfully!",
          updateOrder,
        });
          
       
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Server Error!",
          error: error.message,
        });
      }
      break;

    default:
      break;
  }
}