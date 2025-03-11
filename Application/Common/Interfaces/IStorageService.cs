namespace Application.Common.Interfaces;

public interface IStorageService
{
    Task<StorageItemDto?> AddAsync(string fileName, byte[] content);
    Task<string?> DeleteAsync(string publicId);
}
