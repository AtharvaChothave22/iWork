create database FreelancingWebApplication;
use FreelancingWebApplication;

-- role creation
	INSERT INTO role (created_at, entity_status, updated_at, name) VALUES (CURRENT_TIMESTAMP, 'ACTIVE', CURRENT_TIMESTAMP, 'ADMIN');
    INSERT INTO role (created_at, entity_status, updated_at, name) VALUES (CURRENT_TIMESTAMP, 'ACTIVE', CURRENT_TIMESTAMP, 'FREELANCER');
    INSERT INTO role (created_at, entity_status, updated_at, name) VALUES (CURRENT_TIMESTAMP, 'ACTIVE', CURRENT_TIMESTAMP, 'RECRUITER');
    
    
-- admin
INSERT INTO users (created_at, entity_status, updated_at, about, city, country, email, image, mobile_number, name, password) VALUES (CURRENT_TIMESTAMP, 'ACTIVE', CURRENT_TIMESTAMP, null, null, null, 'pratik.chavhan.77@gmail.com', null, '9175857928', 'Pratik Chavhan', '$2a$10$Ds97xxrtJHFeq7IsaPNnJeHgfB2on9mIwS6XrvhEE0lA4euiNEnpe');


INSERT INTO user_role (created_at, entity_status, updated_at, role_id, user_id) VALUES (CURRENT_TIMESTAMP, 'ACTIVE', CURRENT_TIMESTAMP, 1, 1);


-- category

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Transform ideas into visually compelling designs with creativity and precision.', 'Graphic Design');

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Craft responsive and dynamic websites, ensuring seamless user experiences and functionality.', 'Web Development');

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Create engaging and informative content that captivates audiences and meets diverse writing needs.', 'Content Writing');

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Drive online success through strategic marketing campaigns, SEO optimization, and social media expertise.', 'Digital Marketing');

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Provide remote administrative support, organization, and multitasking to streamline business operations.', 'Virtual Assistance');

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Develop software solutions, troubleshoot technical issues, and bring innovative ideas to life.', 'Programming & Tech');

INSERT INTO category (created_at, entity_status, updated_at, discription, title) VALUES (NOW(6), 'ACTIVE', NOW(6), 'Create polished and captivating video content through precise editing techniques.', 'Video Editing');



