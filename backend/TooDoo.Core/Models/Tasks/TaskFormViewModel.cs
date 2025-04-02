namespace TooDoo.Core.Models.Tasks
{
    public class TaskFormViewModel
    {
        public string TaskTitle { get; set; } = string.Empty;
        public string TaskDescription { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string BoardName { get; set; } = string.Empty;
        public string? AssignedTo { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
    }
}