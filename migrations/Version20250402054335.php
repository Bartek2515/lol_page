<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250402054335 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide DROP FOREIGN KEY FK_1907BE17FA7FD7EB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide DROP FOREIGN KEY FK_1907BE177D4598E1
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide DROP FOREIGN KEY FK_1907BE17A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune DROP FOREIGN KEY FK_98E973F39B0A6649
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune DROP FOREIGN KEY FK_98E973F3E8E5031
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE counter_guide
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE counter_guide_rune
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE rune
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE counter_guide (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, champion_id INT NOT NULL, target_champion_id INT NOT NULL, notes LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, role VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_1907BE17A76ED395 (user_id), UNIQUE INDEX UNIQ_1907BE17FA7FD7EB (champion_id), UNIQUE INDEX UNIQ_1907BE177D4598E1 (target_champion_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE counter_guide_rune (counter_guide_id INT NOT NULL, rune_id INT NOT NULL, INDEX IDX_98E973F3E8E5031 (rune_id), INDEX IDX_98E973F39B0A6649 (counter_guide_id), PRIMARY KEY(counter_guide_id, rune_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE rune (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, tree VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, tier INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = '' 
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide ADD CONSTRAINT FK_1907BE17FA7FD7EB FOREIGN KEY (champion_id) REFERENCES champion (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide ADD CONSTRAINT FK_1907BE177D4598E1 FOREIGN KEY (target_champion_id) REFERENCES champion (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide ADD CONSTRAINT FK_1907BE17A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune ADD CONSTRAINT FK_98E973F39B0A6649 FOREIGN KEY (counter_guide_id) REFERENCES counter_guide (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune ADD CONSTRAINT FK_98E973F3E8E5031 FOREIGN KEY (rune_id) REFERENCES rune (id) ON DELETE CASCADE
        SQL);
    }
}
