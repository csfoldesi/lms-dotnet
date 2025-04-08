using Application.Common;
using Application.Common.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Storage.Settings;
using Microsoft.Extensions.Options;

namespace Infrastructure.Storage;

public class CloudinaryServices : IStorageService
{
    private readonly Cloudinary _cloudinary;
    private readonly string _assetFolder;
    private readonly ILoggerService _loggerService;

    public CloudinaryServices(IOptions<CloudinarySettings> config, ILoggerService loggerService)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(account);
        _assetFolder = config.Value.AssetFolder;
        _loggerService = loggerService;
    }

    public async Task<StorageItemDto?> AddAsync(string fileName, byte[] content)
    {
        using var memoryStream = new MemoryStream(content);
        var uploadParams = new RawUploadParams
        {
            File = new FileDescription(fileName, memoryStream),
            Folder = _assetFolder,
        };
        var uploaResult = await _cloudinary.UploadAsync(uploadParams);
        if (uploaResult.Error != null)
        {
            _loggerService.LogError(uploaResult.Error.Message);
            return null;
        }
        return new StorageItemDto
        {
            Name = fileName,
            PublicId = uploaResult.PublicId,
            URI = uploaResult.SecureUrl.ToString(),
        };
    }

    public async Task<string?> DeleteAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId) { ResourceType = ResourceType.Raw };
        var result = await _cloudinary.DestroyAsync(deleteParams);
        return result.Result == "ok" ? result.Result : null;
    }

    public async Task<string?> DeleteListAsync(List<string> publicIdList)
    {
        var deleteParams = new DelResParams()
        {
            PublicIds = publicIdList,
            ResourceType = ResourceType.Raw,
        };
        var result = await _cloudinary.DeleteResourcesAsync(deleteParams);
        return result.StatusCode == System.Net.HttpStatusCode.OK ? "ok" : null;
    }
}
