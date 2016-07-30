-- Default Admin permissions(unrestricted)
insert into sequ_permission values( 1, 'admin');

-- Default Employee permissions
-- all users will be able to view the schedule, no need for 'view-schedule' permission
insert into sequ_permission values( 2, 'submit-requests-off');

-- Default Manager permissions
insert into sequ_permission values( 3, 'manage-employees');
insert into sequ_permission values( 4, 'manage-requests');
insert into sequ_permission values( 5, 'manage-schedule');
insert into sequ_permission values( 6, 'get-other-store-info');

-- Default Account Holder permissions
insert into sequ_permission values( 7, 'manage-store');
insert into sequ_permission values( 8, 'edit-user-permissions');
insert into sequ_permission values( 9, 'edit-store-locations');

-- add user permission
insert into sequ_user_permission(user_id, permission_id) values(1,  2);
insert into sequ_user_permission(user_id, permission_id) values(2,  2);
insert into sequ_user_permission(user_id, permission_id) values(3,  2);
insert into sequ_user_permission(user_id, permission_id) values(4,  2);
insert into sequ_user_permission(user_id, permission_id) values(5,  2);
insert into sequ_user_permission(user_id, permission_id) values(6,  2);
insert into sequ_user_permission(user_id, permission_id) values(7,  2);
insert into sequ_user_permission(user_id, permission_id) values(8,  2);
insert into sequ_user_permission(user_id, permission_id) values(9,  2);
insert into sequ_user_permission(user_id, permission_id) values(11, 2);
insert into sequ_user_permission(user_id, permission_id) values(12, 2);
insert into sequ_user_permission(user_id, permission_id) values(13, 2);
insert into sequ_user_permission(user_id, permission_id) values(14, 2);
insert into sequ_user_permission(user_id, permission_id) values(15, 2);
insert into sequ_user_permission(user_id, permission_id) values(16, 2);
insert into sequ_user_permission(user_id, permission_id) values(17, 2);
insert into sequ_user_permission(user_id, permission_id) values(18, 2);
insert into sequ_user_permission(user_id, permission_id) values(19, 2);
insert into sequ_user_permission(user_id, permission_id) values(20, 2);
insert into sequ_user_permission(user_id, permission_id) values(21, 2);
insert into sequ_user_permission(user_id, permission_id) values(22, 2);
insert into sequ_user_permission(user_id, permission_id) values(23, 2);
insert into sequ_user_permission(user_id, permission_id) values(24, 2);
insert into sequ_user_permission(user_id, permission_id) values(25, 2);
insert into sequ_user_permission(user_id, permission_id) values(26, 2);
insert into sequ_user_permission(user_id, permission_id) values(27, 2);
insert into sequ_user_permission(user_id, permission_id) values(28, 2);
insert into sequ_user_permission(user_id, permission_id) values(29, 2);
insert into sequ_user_permission(user_id, permission_id) values(30, 2);
insert into sequ_user_permission(user_id, permission_id) values(31, 2);
insert into sequ_user_permission(user_id, permission_id) values(32, 2);
insert into sequ_user_permission(user_id, permission_id) values(33, 2);
insert into sequ_user_permission(user_id, permission_id) values(34, 2);
insert into sequ_user_permission(user_id, permission_id) values(35, 2);
insert into sequ_user_permission(user_id, permission_id) values(36, 2);
insert into sequ_user_permission(user_id, permission_id) values(37, 2);
insert into sequ_user_permission(user_id, permission_id) values(38, 2);
insert into sequ_user_permission(user_id, permission_id) values(39, 2);
insert into sequ_user_permission(user_id, permission_id) values(40, 2);
insert into sequ_user_permission(user_id, permission_id) values(41, 2);
insert into sequ_user_permission(user_id, permission_id) values(42, 2);
insert into sequ_user_permission(user_id, permission_id) values(43, 2);
insert into sequ_user_permission(user_id, permission_id) values(44, 2);
insert into sequ_user_permission(user_id, permission_id) values(45, 2);
insert into sequ_user_permission(user_id, permission_id) values(46, 2);
insert into sequ_user_permission(user_id, permission_id) values(47, 2);
insert into sequ_user_permission(user_id, permission_id) values(48, 2);
insert into sequ_user_permission(user_id, permission_id) values(49, 2);
insert into sequ_user_permission(user_id, permission_id) values(50, 2);
