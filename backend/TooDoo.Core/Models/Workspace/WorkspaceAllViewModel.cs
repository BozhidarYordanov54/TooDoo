using TooDoo.Core.Models.Boards;

namespace TooDoo.Core.Models.Workspace
{
    public class WorkspaceAllViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string OwnerId { get; set; } = string.Empty;
        public List<BoardAllViewModel> Boards { get; set; } = new List<BoardAllViewModel>();
    }
}