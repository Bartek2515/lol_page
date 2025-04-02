<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250402055536 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE counter_guide_rune (counter_guide_id INT NOT NULL, rune_id INT NOT NULL, INDEX IDX_98E973F39B0A6649 (counter_guide_id), INDEX IDX_98E973F3E8E5031 (rune_id), PRIMARY KEY(counter_guide_id, rune_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune ADD CONSTRAINT FK_98E973F39B0A6649 FOREIGN KEY (counter_guide_id) REFERENCES counter_guide (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune ADD CONSTRAINT FK_98E973F3E8E5031 FOREIGN KEY (rune_id) REFERENCES rune (id) ON DELETE CASCADE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune DROP FOREIGN KEY FK_98E973F39B0A6649
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE counter_guide_rune DROP FOREIGN KEY FK_98E973F3E8E5031
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE counter_guide_rune
        SQL);
    }
}
