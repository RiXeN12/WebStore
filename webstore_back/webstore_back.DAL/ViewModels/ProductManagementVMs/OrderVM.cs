using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webstore_back.DAL.ViewModels.ProductManagementVMs
{
    public class OrderVM
    {
        public string Id { get; set; }
        public double TotalPrice { get; set; }
        public bool IsCompleted { get; set; }
        public required string UserName { get; set; }
    }
}
