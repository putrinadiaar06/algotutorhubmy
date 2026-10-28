-- Algonova MyTutorHub Database Schema
CREATE TABLE IF NOT EXISTS `CustomUser` (
  `id` VARCHAR(36) PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('Head of Retention', 'Head of Tutor', 'QC Team', 'Feedback Team', 'Team Leader', 'Tutor') NOT NULL,
  `phone_number` VARCHAR(50) NULL,
  `telegram_account` VARCHAR(100) NULL,
  `telegram_bot_token` VARCHAR(255) NULL,
  `photo_url` TEXT NULL,
  `link_bo` TEXT NULL,
  `rbac` JSON NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Tasks` (
  `id` VARCHAR(36) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `status` ENUM('todo', 'in_progress', 'under_review', 'done') DEFAULT 'todo',
  `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
  `assigned_to` VARCHAR(36) NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `due_date` DATE NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`assigned_to`) REFERENCES `CustomUser`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `FeedbackAssignments` (
  `id` VARCHAR(36) PRIMARY KEY,
  `class_code` VARCHAR(50) NOT NULL,
  `course_name` VARCHAR(100) NOT NULL,
  `month_num` TINYINT NOT NULL,
  `tutor_id` VARCHAR(36) NOT NULL,
  `assigned_by` VARCHAR(36) NOT NULL,
  `due_date` DATE NOT NULL,
  `status` ENUM('pending', 'submitted', 'late') DEFAULT 'pending',
  `submitted_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`tutor_id`) REFERENCES `CustomUser`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `QCRecord` (
  `id` VARCHAR(36) PRIMARY KEY,
  `tutor_id` VARCHAR(36) NOT NULL,
  `admin_qc_id` VARCHAR(36) NULL,
  `evaluation_score` FLOAT NULL,
  `final_grade` VARCHAR(50) NULL,
  `period` TINYINT DEFAULT 1,
  `period_month` TINYINT NOT NULL,
  `period_year` INT NOT NULL,
  `aspect_scores` JSON NULL,
  `notes` TEXT NULL,
  `acknowledged_by_tutor` TINYINT(1) DEFAULT 0,
  `tutor_response_note` TEXT NULL,
  `acknowledged_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`tutor_id`) REFERENCES `CustomUser`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
