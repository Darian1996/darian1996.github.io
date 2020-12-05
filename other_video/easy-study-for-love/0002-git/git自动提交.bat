
:: cd D:\z_my_gitHub_repositories\gp-docs

:: ������Ҫ�Լ����� commit message
:: set /p commit_msg=Please input commit message:

:: ��������ʹ�õ�ǰʱ������Ϊ commit ����Ϣ
set  commit_msg= %date:~0,10%   %time% AutoCommit.bat by Darian

git status 
git add * 
git commit -m "%commit_msg%"
git pull
git push
Exit