namespace Application.Common.Interfaces;

public interface IStorageService
{
    Task<StorageItemDto?> AddImageAsync(string fileName, byte[] content);
    Task<string?> Delete(string publicId);
}
