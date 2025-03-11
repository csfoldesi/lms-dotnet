﻿using Application.Common;
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

    public CloudinaryServices(IOptions<CloudinarySettings> config)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(account);
        _assetFolder = config.Value.AssetFolder;
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
            //throw new Exception(uploaResult.Error.Message);
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
}
