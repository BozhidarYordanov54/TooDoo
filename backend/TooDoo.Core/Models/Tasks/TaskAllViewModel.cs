using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TooDoo.Core.Models.Tasks
{
    public class TaskAllViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string AssignedTo { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
    }
}