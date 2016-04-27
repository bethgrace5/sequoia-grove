-- Default Employee permissions 
insert into SEQU_PERMISSION values( 1, 'view-schedule');
insert into SEQU_PERMISSION values( 2, 'submit-requests-off');

-- Default Manager permissions (plus all of the above)
insert into SEQU_PERMISSION values( 3, 'manage-employees');
insert into SEQU_PERMISSION values( 4, 'manage-requests');
insert into SEQU_PERMISSION values( 5, 'manage-schedule');

-- Default Account Holder permissions (plus all of the above)
insert into SEQU_PERMISSION values( 6, 'manage-store');
insert into SEQU_PERMISSION values( 7, 'edit-user-permissions');

-- Default Admin permissions (unrestricted)
insert into SEQU_PERMISSION values( 8, 'admin');

-- add user permission
insert into sequ_user_permissions(user_id, permission_id) values(1,  1);
insert into sequ_user_permissions(user_id, permission_id) values(2,  1);
insert into sequ_user_permissions(user_id, permission_id) values(3,  1);
insert into sequ_user_permissions(user_id, permission_id) values(4,  1);
insert into sequ_user_permissions(user_id, permission_id) values(5,  1);
insert into sequ_user_permissions(user_id, permission_id) values(6,  1);
insert into sequ_user_permissions(user_id, permission_id) values(7,  1);
insert into sequ_user_permissions(user_id, permission_id) values(8,  1);
insert into sequ_user_permissions(user_id, permission_id) values(9,  1);
insert into sequ_user_permissions(user_id, permission_id) values(11, 1);
insert into sequ_user_permissions(user_id, permission_id) values(12, 1);
insert into sequ_user_permissions(user_id, permission_id) values(13, 1);
insert into sequ_user_permissions(user_id, permission_id) values(14, 1);
insert into sequ_user_permissions(user_id, permission_id) values(15, 1);
insert into sequ_user_permissions(user_id, permission_id) values(16, 1);
insert into sequ_user_permissions(user_id, permission_id) values(17, 1);
insert into sequ_user_permissions(user_id, permission_id) values(18, 1);
insert into sequ_user_permissions(user_id, permission_id) values(19, 1);
insert into sequ_user_permissions(user_id, permission_id) values(20, 1);
insert into sequ_user_permissions(user_id, permission_id) values(21, 1);
insert into sequ_user_permissions(user_id, permission_id) values(22, 1);
insert into sequ_user_permissions(user_id, permission_id) values(23, 1);
insert into sequ_user_permissions(user_id, permission_id) values(24, 1);
insert into sequ_user_permissions(user_id, permission_id) values(25, 1);
insert into sequ_user_permissions(user_id, permission_id) values(26, 1);
insert into sequ_user_permissions(user_id, permission_id) values(27, 1);
insert into sequ_user_permissions(user_id, permission_id) values(28, 1);
insert into sequ_user_permissions(user_id, permission_id) values(29, 1);
insert into sequ_user_permissions(user_id, permission_id) values(30, 1);
insert into sequ_user_permissions(user_id, permission_id) values(31, 1);
insert into sequ_user_permissions(user_id, permission_id) values(32, 1);
insert into sequ_user_permissions(user_id, permission_id) values(33, 1);
insert into sequ_user_permissions(user_id, permission_id) values(34, 1);
insert into sequ_user_permissions(user_id, permission_id) values(35, 1);
insert into sequ_user_permissions(user_id, permission_id) values(36, 1);
insert into sequ_user_permissions(user_id, permission_id) values(37, 1);
insert into sequ_user_permissions(user_id, permission_id) values(38, 1);
insert into sequ_user_permissions(user_id, permission_id) values(39, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(40, 1);
insert into sequ_user_permissions(user_id, permission_id) values(50, 1);
insert into sequ_user_permissions(user_id, permission_id) values(51, 9);
insert into sequ_user_permissions(user_id, permission_id) values(52, 9);
insert into sequ_user_permissions(user_id, permission_id) values(53, 9);
insert into sequ_user_permissions(user_id, permission_id) values(54, 9);
