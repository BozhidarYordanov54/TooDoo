namespace TooDoo.Core.Contracts
{
    public interface IFileService
    {
        /// <summary>
        /// Uploads a file to the specified folder path and returns the file URL.
        /// </summary>
        Task<string> UploadFileAsync(Microsoft.AspNetCore.Http.IFormFile file, string folderPath);          
    }
}