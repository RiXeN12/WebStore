using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webstore_back.DAL.ViewModels.ProductManagementVMs
{
    public class OrderItemVM
    {
        public string Id { get; set; }
        public int Quantity { get; set; }
        public bool IsPaidFor { get; set; }
        public string Size { get; set; }
    }
}
