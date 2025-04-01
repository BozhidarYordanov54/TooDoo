using Microsoft.AspNetCore.Http;
using TooDoo.Core.Contracts;

namespace TooDoo.Core.Services
{
    public class FileService : IFileService
    {
        public Task<string> UploadFileAsync(IFormFile file, string folderPath)
        {
            string filePath = Path.Combine(folderPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            // Assuming the file is uploaded successfully, return the file URL.

            return Task.FromResult($"http://localhost:5173/{folderPath}/{file.FileName}");
        }
    }
}