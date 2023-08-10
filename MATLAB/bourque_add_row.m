function[R_1] = bourque_add_row(R,j,a)
    %from (3.6.1) and the following discussion in the textbook,
    %we only need to multiply [row; R] on the left by m rotators
    %should be no dependence on j
    [n,m] = size(R);
    R_1 = [a;R];
    for i = 1:m
        %construct matrix U_i such that U_i'*R_1 has 0 in (i+1,i) spot.
        U_i = rotator(R_1(i,i),R_1(i+1,i),i,i+1,n+1);
        R_1 = U_i'*R_1;
    end
    return
end

function U = rotator(x,y,i,j,n) %i < j
    U = eye(n);
    s = 0;
    if norm([x,y]) == 0
        c = 1;
    else
        c = x/norm([x,y]);
        s = y/norm([x,y]);
    end
    U(i,i) = c;
    U(j,j) = c;
    U(i,j) = -s;
    U(j,i) = s;
    return
end