-- run script berikut pada sql command untuk membuat view v_user
CREATE VIEW `v_user` AS
	select 
		u.user_id,
		u.username,
		u.email,
		u.password,
		u.level_id,
		u.description,
		u.is_active,
		u.foto,
		l.level_name
	FROM user u
	LEFT JOIN level l on u.level_id = l.level_id;