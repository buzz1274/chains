import os
from abc import abstractmethod

import boto3
from pathlib import Path
from botocore.exceptions import ClientError
from mypy_boto3_s3 import S3Client
from abc import ABC


class FileStorage(ABC):
    FAILED_TO_RETRIEVE_ERROR: str = "Failed to retrieve old backups"
    NO_BACKUP_FILES: str = "No backup files found"
    INVALID_FILE_ERROR: str = "Invalid file"
    FAILED_TO_DELETE_ERROR: str = "Failed to delete old backups"

    @abstractmethod
    def save_file(self, save_path: str) -> bool:
        """save a file to file storage"""
        pass

    @abstractmethod
    def delete_old_backups(self, days_to_keep: int) -> bool:
        """delete old backups from file storage"""
        pass

    @abstractmethod
    def get_latest_backup_file(self, save_path: str) -> str:
        """retrieve file from file_storage and save to local save_path"""
        pass

    def is_valid_file(self, file_path: str) -> bool:
        """determine if a file is valid and not empty"""
        return os.path.isfile(file_path) and os.stat(file_path).st_size > 0


class S3FileStorage(FileStorage):
    def __init__(self, aws_bucket_name: str, aws_backup_path: str):
        """S3 File Storage"""
        self.s3_client: S3Client = self._initialize_s3_client()
        self.aws_bucket_name: str = aws_bucket_name
        self.aws_backup_path: str = aws_backup_path

    def save_file(self, save_path: str) -> bool:
        """save file to S3"""
        try:
            self.s3_client.upload_file(
                save_path,
                self.aws_bucket_name,
                f"{self.aws_backup_path}/{Path(save_path).name}",
            )
            return True
        except ClientError as e:
            raise RuntimeError(f"Failed to upload file: {str(e)}") from e

    def delete_old_backups(self, days_to_keep: int):
        """delete old backups from S3"""
        try:
            for file in self._get_all_files()[days_to_keep:]:
                self.s3_client.delete_object(
                    Bucket=self.aws_bucket_name,
                    Key=file["Key"],
                )
        except ClientError as e:
            raise RuntimeError(self.FAILED_TO_DELETE_ERROR) from e

    def get_latest_backup_file(self, save_path: str) -> str:
        """retrieve file from S3 and save to local save_path"""
        try:
            latest_backup_file: dict = self._get_all_files()[0]
            save_path = os.path.join(
                save_path, Path(latest_backup_file["Key"]).name
            )

            self.s3_client.download_file(
                self.aws_bucket_name,
                latest_backup_file["Key"],
                save_path,
            )

            if not self.is_valid_file(save_path):
                raise RuntimeError(self.INVALID_FILE_ERROR)

            return save_path
        except IndexError as e:
            raise RuntimeError(self.NO_BACKUP_FILES) from e

    def _get_all_files(self) -> list:
        """retrieve all metadata for all files in S3"""
        try:
            all_files = self.s3_client.list_objects_v2(
                Bucket=self.aws_bucket_name,
                Prefix=self.aws_backup_path,
            ).get("Contents", [])

            return sorted(
                (file for file in all_files if file["Key"].endswith(".sql")),
                key=lambda x: x["LastModified"],
                reverse=True,
            )

        except ClientError as e:
            raise RuntimeError(self.FAILED_TO_RETRIEVE_ERROR) from e

    def _initialize_s3_client(self) -> S3Client:
        """initialize boto S3 client"""
        return boto3.client("s3")
